import React from "react";
import {
  StyledContainer,
  CameraScreen,
  CameraButton,
  PlayButton,
  ButtonContainer,
  InstructionButton,
  ExternalButtonContainer,
} from "../components/styles";
import { Text, Image } from 'react-native';
import CameraComponent from '../CameraComponent';

const MainScreen = () => {
  return (
    <StyledContainer>
      {/* <CameraScreen
        resizeMode="cover"
        source={require("../assets/pillbottleCameraScreen.png")}
      /> */}
      <CameraComponent />
      <ExternalButtonContainer>
        <ButtonContainer>
        <CameraButton>
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
