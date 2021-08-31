import * as ImagePicker from "expo-image-picker";
import * as Speech from 'expo-speech';
import { Camera } from "expo-camera";
import Environment from "../config/environments";
import firebase from "../config/firebase";
import prescriptionParser from "../dummyDataTesting/dataParsingTests";
import React, { useEffect, useState } from "react";
import uuid from "uuid";

// Responsive Design
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

// Native component imports
import {
  ActivityIndicator,
  Image,
  Pressable,
  StatusBar,
  View,
} from "react-native";

// Styled component imports
import {
  InnerContainer,
  LongButton,
  StyledContainer,
  TopRowBtnContainer,
} from "../components/styles";

const MainScreen = ({ navigation }) => {
  // React Hooks Notes:
  //const[stateName, stateChangeFunctionName]= State'sDefaultValue
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [googleResponse, setGoogleResponse] = useState(null);
  const [hasPermission, setHasPermission] = useState(null)

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
      setHasPermission(true)
    })();
  }, []);

  const speak = (thingToSay) => {
    Speech.speak(thingToSay);
  };

  if (hasPermission === null) {
    Speech.speak("Please allow app to access camera")
  }

  const _maybeRenderUploadingOverlay = () => {
    if (uploading) {
      return (
        <View>
          <ActivityIndicator color="#000" animating size="large" />
        </View>
      );
    }
  };

  const logData = () => {
    if (googleResponse) {
      if (typeof (googleResponse.responses[0]) === "object" && Array.isArray(googleResponse.responses) && (Object.keys(googleResponse.responses[0]))[0] === undefined) {
        return "There was an error. Please retake photo."
      } else {
        let prescriptionData = googleResponse;
        let parsedData = JSON.stringify(googleResponse.responses[0].textAnnotations[0].description)

        fetch("http://192.168.1.169:5000", {
          method: "post",
          body: JSON.stringify(googleResponse),
          headers: { "Content-Type": "application/json" }
        });

        const prescriptionInstructions = prescriptionParser(prescriptionData)
        const myRe = /([A-Z]){4,}/g
        const textArr = parsedData.match(myRe);
        const medicationName = textArr.join(' ');

        if (medicationName === undefined) {
          return "There was an error. Please retake photo."
        } else {
          return medicationName + prescriptionInstructions;
        }
      }
    } else {
      return "There was an error. Please retake photo."
    }
  }

  const _maybeRenderImage = () => {
    if (!image) {
      return;
    }
    return (
      <View style={{
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Image
          source={{ uri: image }}
          resizeMode="contain"
          style={{ width: wp('90%'), height: hp('40%') }}
        />
        <LongButton
          submit={true}
          onPress={() => submitToGoogleVision()}
        >
          <Image
            source={require("../assets/submitPhotoButton.png")}
            resizeMode="contain"
            style={{ width: wp('90%'), height: hp('8%') }}
          />
        </LongButton>
      </View>
    );
  };

  const uploadImageAsync = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

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

  // Note: aspect only works for Android
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
      setGoogleResponse(responseJson);
      setUploading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledContainer>
      <InnerContainer>
        {image ? null : (
          <Image
            source={require("../assets/pillBottle.png")}
            resizeMode="contain"
            style={{ width: wp('90%'), height: hp('40%') }}
          />
        )}

        {_maybeRenderImage()}
        {_maybeRenderUploadingOverlay()}
        <View>
          <TopRowBtnContainer>
            <Pressable onPress={_takePhoto}>
              <Image
                source={require("../assets/cameraButton.png")}
                resizeMode="contain"
                style={{ width: wp('100%'), height: hp('12%') }}
              />
            </Pressable>

            <Pressable onPress={() => speak(logData())}>
              <Image
                source={require("../assets/playButton.png")}
                resizeMode="contain"
                style={{ width: wp('90%'), height: hp('12%') }}
              />
            </Pressable>
          </TopRowBtnContainer>

          <View>
            <LongButton onPress={() => speak("Press the blue camera button to take a photo. Press the purple play button to replay the information from the bottle.")}>
              <Image
                source={require("../assets/instructionsButton.png")}
                resizeMode="contain"
                style={{ width: wp('90%'), height: hp('8%') }}
              />
            </LongButton>
            <LongButton onPress={() => navigation.navigate('Settings')}>
              <Image
                source={require("../assets/settingsButton.png")}
                resizeMode="contain"
                style={{ width: wp('90%'), height: hp('8%') }}
              />
            </LongButton>
          </View>

        </View>

        <StatusBar barStyle="dark-content" />
      </InnerContainer>
    </StyledContainer>
  );
};

export default MainScreen;
