import React, { useState, useEffect } from "react";
import {
  StyledContainer,
  CameraScreen,
  CameraButton,
  PlayButton,
  ButtonContainer,
  InstructionButton,
  ExternalButtonContainer,
} from "../components/styles";

import {
  Text,
  Image,
  ActivityIndicator,
  Button,
  Clipboard,
  FlatList,
  Share,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import CameraComponent from "../CameraComponent";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import uuid from "uuid";
import firebase from "../config/firebase";
import Environment from "../config/environments";

const MainScreen = () => {
  // react hooks: const[statename, state change func name]= State's default value
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [googleResponse, setGoogleResponse] = useState(null);

  useEffect(async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  });
  let currentImage = image;

  const _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
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
    let currentImage = image;
    let currGoogleResponse = googleResponse;
    if (!currentImage) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}
      >
        <Button
          style={{ marginBottom: 10 }}
          onPress={() => submitToGoogle()}
          title="Analyze!"
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
            source={{ uri: currentImage }}
            style={{ width: 250, height: 250 }}
          />
        </View>

        <Text>Raw JSON:</Text>

        {currGoogleResponse && (
          <Text style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
            {JSON.stringify(currGoogleResponse.responses)}
          </Text>
        )}
      </View>
    );
  };

  const _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    _handleImagePicked(pickerResult);
  };

  const _handleImagePicked = async (pickerResult) => {
    //WE STOPPED HERE
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        let uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false });
    }
  };

  const submitToGoogle = async () => {
    try {
      this.setState({ uploading: true });
      let { image } = this.state;
      let body = JSON.stringify({
        requests: [
          {
            features: [
              // { type: "LABEL_DETECTION", maxResults: 10 },
              // { type: "LANDMARK_DETECTION", maxResults: 5 },
              // { type: "FACE_DETECTION", maxResults: 5 },
              // { type: "LOGO_DETECTION", maxResults: 5 },
              { type: "TEXT_DETECTION", maxResults: 5 },
              // { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
              // { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
              // { type: "IMAGE_PROPERTIES", maxResults: 5 },
              // { type: "CROP_HINTS", maxResults: 5 },
              // { type: "WEB_DETECTION", maxResults: 5 }
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
      this.setState({
        googleResponse: responseJson,
        uploading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
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

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }

  return (
    <StyledContainer>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {image ? null : (
          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              textAlign: "center",
              marginHorizontal: 15,
            }}
          >
            Example: Upload ImagePicker result
          </Text>
        )}

        {googleResponse && (
          <FlatList
            data={googleResponse.responses[0].labelAnnotations}
            // extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => <Text>Item: {item.description}</Text>}
          />
        )}

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}
        <StatusBar barStyle="default" />
      </View>
      <ExternalButtonContainer>
        <ButtonContainer>
          <CameraButton onPress={this._takePhoto}>
            <Image source={require("../assets/Camerabutton.png")} />
          </CameraButton>
          <PlayButton>
            <Image source={require("../assets/playButton.png")} />
          </PlayButton>
        </ButtonContainer>
        <InstructionButton>
          <Image source={require("../assets/InstructionsButton.png")} />
        </InstructionButton>
      </ExternalButtonContainer>

      {/* Styling: three containers arranged in column
Column 1: photo/camera screen
Column 2: camera and play button icons in row
Column 3: information/replay button  */}
    </StyledContainer>
  );
};

export default MainScreen;
