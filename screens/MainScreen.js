import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import Environment from "../config/environments";
import firebase from "../config/firebase";
import React, { useEffect, useState } from "react";
import uuid from "uuid";
import { Pressable } from "react-native";

// Native component imports
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Styled component imports
import {
  ButtonContainer,
  ExternalButtonContainer,
  InstructionButton,
  StyledContainer,
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

  const _keyExtractor = (item, index) => item.id;

  const _maybeRenderUploadingOverlay = () => {
    if (uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  const _maybeRenderImage = () => {
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          borderRadius: 3,
          elevation: 2,
          marginTop: 30,
          width: 250,
        }}
      >
        <Button
          style={{ marginBottom: 10 }}
          onPress={() => submitToGoogle()}
          title="Submit!"
        />

        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: "hidden",
          }}
        >
          <Image
            source={{ uri: image }}
            style={{ width: 250, height: 250 }}
          />
        </View>

        <Text>Raw JSON:</Text>

        {googleResponse && (
          <Text style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
            {JSON.stringify(googleResponse.responses)}
          </Text>
        )}
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
  }

  const _handleImagePicked = async (pickerResult) => {
    //WE STOPPED HERE
    try {
      setUploading(true);
      if (!pickerResult.cancelled) {
        let uploadUrl = await uploadImageAsync(pickerResult.uri);
        setImage(uploadUrl)
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

  const submitToGoogle = async () => {
    try {
      setUploading(true);
      let body = JSON.stringify({
        requests: [
          {
            features: [
              { type: "TEXT_DETECTION", maxResults: 5 },
            ],
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

  return (
    <StyledContainer>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {image ? null : (
          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              marginHorizontal: 15,
              textAlign: "center",
            }}
          >
            Example: Upload ImagePicker result
          </Text>
        )}

        {googleResponse && (
          <FlatList
            data={googleResponse.responses[0].labelAnnotations}
            keyExtractor={_keyExtractor}
            renderItem={({ item }) => <Text>Item: {item.description}</Text>}
          />
        )}

        {_maybeRenderImage()}
        {_maybeRenderUploadingOverlay()}

      </View>

      <ExternalButtonContainer>

        <ButtonContainer>
          <Pressable onPress={_takePhoto}>
            <Image source={require("../assets/Camerabutton.png")} />
          </Pressable>

          <Pressable>
            <Image source={require("../assets/playButton.png")} />
          </Pressable>
        </ButtonContainer>

        <InstructionButton>
          <Image source={require("../assets/InstructionsButton.png")} />
        </InstructionButton>

      </ExternalButtonContainer>

      <StatusBar barStyle="default" />

    </StyledContainer>
  );
};

export default MainScreen;
