import styled from "styled-components";
import { View, Image, Text, TextInput, Pressable } from "react-native";
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

export const StyledContainer = styled.View`
  flex: 1;
  align-items: center;
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

// Login Screen Components
export const SubTitle = styled.Text`
  font-size: 30px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${blue};
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${palePink};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${purple}
`;
export const StyledInputLabel = styled.Text`
  color: ${purple}
  font-size: 13px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.Pressable`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;
export const StyledButton = styled.Pressable`
  padding: 15px;
  background-color: ${blue};
  justify-content: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;
  align-items: center;
`;
export const ButtonText = styled.Text`
  color: ${purple};
  font-size: 24px;
`;

export const LoginPageLogo = styled.Image`
  width: 100%;
  height: 400px;
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
`

export const Line = styled.View`
  height: 1px;
  width: 100%
  background-color: ${green}
  margin-vertical: 10px;
`

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`

export const ExtraText = styled.Text`
  justify-content: center;
  align-content: center;
  color: ${purple};
  font-size: 24px
`

export const TextLink = styled.Pressable`
  justify-content: center;
  align-items: center;
`

export const TextLinkContent = styled.Text`
  color: ${green};
  font-size: 24px;
`
