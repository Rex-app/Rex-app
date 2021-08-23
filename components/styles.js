import styled from "styled-components";
import { View, Image } from "react-native";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react";

// Color scheme
export const Colors = {
  green: "#50A561",
  blue: "#5BC0EB",
  palePink: "#EAD7D1",
  purple: "#7871AA",
  pink: "#D58593",
};
const { green, blue, palePink, purple, pink } = Colors;

// Shared Components
export const StyledContainer = styled.View`
  flex: 1;
`;

// Main Screen Components
export const ButtonContainer = styled.View`
  flexdirection: row;
  margin-top: 35px;
  justify-content: space-around;
`;

export const CameraScreen = styled.Image`
  width: 100%;
  height: 65%;
`;

export const ExternalButtonContainer = styled.View`
  position: relative;
  flexwrap: wrap;
`;

export const InstructionButton = styled.TouchableOpacity`
  width: 300px;
  height: 50px;
  margin-top: 50px;
  margin-left: 50px;
  zindex: 1;
  align-content: center;
`;

// Splash Screen Components
export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const PageLogo = styled.Image`
  width: 100%;
  height: 700px;
`;
export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${purple};
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;
