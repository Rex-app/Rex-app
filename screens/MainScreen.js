import * as ImagePicker from "expo-image-picker";
import * as Speech from 'expo-speech';
import { Camera } from "expo-camera";
import firebase from "../config/firebase";
import React, { useEffect, useState } from "react";
import uuid from "uuid";

// Function Imports
import { logData, submitToGoogleVision } from "../services/vision-service";

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
    See: https://stackoverflow.com/questions/58495238/getting-error-after-i-put-async-function-in-useeffect
    See: https://reactjs.org/docs/hooks-effect.html
  */
  useEffect(() => {
    (async () => {
      await Camera.requestPermissionsAsync();
      setHasPermission(true);
      Speech.speak("Press the blue camera button to take a photo. Then press submit photo. Press the purple play button to replay the information from the bottle.")
    })();
  }, []);

  const speak = (thingToSay) => {
    Speech.speak(thingToSay);
  };

  if (hasPermission === null) {
    Speech.speak("Please allow app to access camera")
  }

  const renderUploadingOverlay = () => {
    return (
      <View>
        <ActivityIndicator color="#000" animating size="large" />
      </View>
    );
  };

  const renderImage = () => {
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
          onPress={() => submitToGoogleVision(setUploading, setGoogleResponse, image)}
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

  const handleSelectedImage = async (pickerResult) => {
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
  const takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    handleSelectedImage(pickerResult);
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
        {!image ? null : renderImage()}
        {uploading ? renderUploadingOverlay() : null}
        <View>
          <TopRowBtnContainer>
            <Pressable onPress={takePhoto}>
              <Image
                source={require("../assets/cameraButton.png")}
                resizeMode="contain"
                style={{ width: wp('100%'), height: hp('12%') }}
              />
            </Pressable>
            <Pressable onPress={() => speak(logData(googleResponse))}>
              <Image
                source={require("../assets/playButton.png")}
                resizeMode="contain"
                style={{ width: wp('90%'), height: hp('12%') }}
              />
            </Pressable>
          </TopRowBtnContainer>
          <View>
            <LongButton onPress={() => speak("Press the blue camera button to take a photo. Then press submit photo. Press the purple play button to replay the information from the bottle.")}>
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
