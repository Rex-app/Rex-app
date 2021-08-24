import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import Environment from "../config/environments";
import firebase from "../config/firebase";
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from "react";
import uuid from "uuid";
import { Pressable } from "react-native";

// Native component imports
import {
  ActivityIndicator,
  Image,
  StatusBar,
  View,
} from "react-native";

// Styled component imports
import {
  BottomRowBtnContainer,
  CapturedImageContainer,
  ExternalButtonContainer,
  InnerContainer,
  LongButton,
  PlaceHolderImg,
  StyledContainer,
  TopRowBtnContainer,
} from "../components/styles";

const MainScreen = () => {
  // React Hooks Notes:
  //const[stateName, stateChangeFunctionName]= State'sDefaultValue
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [googleResponse, setGoogleResponse] = useState(null);

  /*
    useEffect Notes:
    useEffect() take two parameters a function and an a dependency array
    See: https://stackoverflow.com/questions/58495238/getting-error-after-i-put-async-function-in-useeffect
        for more info about the function parameter
    See: https://reactjs.org/docs/hooks-effect.html for more info about the
        dependency array parameter
  */
  useEffect(() => {
    (async () => {
      await Camera.requestPermissionsAsync();
    })();
  }, []);

  const _maybeRenderUploadingOverlay = () => {
    if (uploading) {
      return (
        <View>
          <ActivityIndicator color="#000" animating size="large" />
        </View>
      );
    }
  };

  const _maybeRenderImage = () => {
    if (!image) {
      return;
    }

    return (
      <View style={{
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 50,
      }}>
        <PlaceHolderImg source={{ uri: image }} />
        <LongButton
          submit={true}
          onPress={() => submitToGoogleVision()}
        >
          <Image source={require("../assets/submitPhotoButton.png")} />
        </LongButton>
      </View>
    );
  };

  const uploadImageAsync = async (uri) => {
    // XMLHttpRequest Notes:
    // See: https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const ref = firebase.storage().ref().child(uuid.v4());
    const snapshot = await ref.put(blob);

    // Done with blob; close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  };

  const _handleImagePicked = async (pickerResult) => {
    try {
      setUploading(true);
      if (!pickerResult.cancelled) {
        let uploadUrl = await uploadImageAsync(pickerResult.uri);
        setImage(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    _handleImagePicked(pickerResult);
  };

  const submitToGoogleVision = async () => {
    try {
      setUploading(true);
      let body = JSON.stringify({
        requests: [
          {
            features: [{ type: "TEXT_DETECTION", maxResults: 5 }],
            image: {
              source: {
                imageUri: image,
              },
            },
          },
        ],
      });
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
        Environment["GOOGLE_CLOUD_VISION_API_KEY"],
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: body,
        }
      );
      let responseJson = await response.json();
      console.log(responseJson);
      setGoogleResponse(responseJson);
      setUploading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //needs 'text' variable from JSON body of text from image
  const speak = (thingToSay) => {
    Speech.speak(thingToSay);
  };

  return (
    <StyledContainer>
      <InnerContainer>
        <CapturedImageContainer>
          {image ? null : (
            <PlaceHolderImg source={require("../assets/pillBottle.png")} />
          )}

          {_maybeRenderImage()}

          {_maybeRenderUploadingOverlay()}
        </CapturedImageContainer>

        <ExternalButtonContainer>
          <TopRowBtnContainer>
            <Pressable onPress={_takePhoto}>
              <Image source={require("../assets/cameraButton.png")} />
            </Pressable>

            <Pressable onPress={() => speak("30 mg Fluoxetine. Take one tablet by mouth every morning.")}>
              <Image source={require("../assets/playButton.png")} />
            </Pressable>
          </TopRowBtnContainer>

          <BottomRowBtnContainer>
            <LongButton onPress={() => speak("Press the blue camera button to take a photo. Press the purple play button to replay the information from the bottle.")}>
              <Image source={require("../assets/instructionsButton.png")} />
            </LongButton>
          </BottomRowBtnContainer>

        </ExternalButtonContainer>

        <StatusBar barStyle="default" />
      </InnerContainer>
    </StyledContainer>
  );
};

export default MainScreen;
