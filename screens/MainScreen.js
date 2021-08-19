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
import { Text } from 'react-native';

const MainScreen = () => {
  return (
    <StyledContainer>
      <CameraScreen
        resizeMode="cover"
        source={require("../assets/pillbottleCameraScreen.png")}
      />
      <ExternalButtonContainer>
        <ButtonContainer>
        <CameraButton source={require("../assets/Camerabutton.png")} />
        <PlayButton source={require("../assets/playButton.png")} />
        </ButtonContainer>
        <InstructionButton
          source={require("../assets/InstructionsButton.png")}
        />
      </ExternalButtonContainer>
 
     
      {/* Styling: three containers arranged in column
Column 1: photo/camera screen
Column 2: camera and play button icons in row
Column 3: information/replay button  */}
    </StyledContainer>
  );
};

export default MainScreen;
