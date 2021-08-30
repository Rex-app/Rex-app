import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import styled from "styled-components/native";
import { TouchableOpacity } from "react";

// Color scheme
export const Colors = {
  blue: "#5BC0EB",
  green: "#50A561",
  palePink: "#EAD7D1",
  pink: "#D58593",
  purple: "#7871AA",
};
const { green, blue, palePink, purple, pink } = Colors;

// Shared Components
export const StyledContainer = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

// Main Screen Components
export const BottomRowBtnContainer = styled.View`
  width: 100%;
`;

export const ButtonContainer = styled.View`
  flexdirection: row;
  margin-top: 35px;
  justify-content: space-around;
`;

export const CapturedImageContainer = styled.View`
  align-items: center;
  height: 500px;
  justify-content: center;
  width: 100%;
  height: 65%;
`;

export const ExternalButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  width: 100%;
`;

// Splash Screen Components
export const InstructionButton = styled.TouchableOpacity`
  width: 300px;
  height: 50px;
  margin-top: 50px;
  margin-left: 50px;
  z-index: 1;
  align-content: center;
`;

// Login/Signup Screen Components
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
  color: ${purple};
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
`;

export const Line = styled.View`
  height: 1px;
  width: 100%
  background-color: ${green}
  margin-vertical: 10px;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const LongButton = styled.TouchableOpacity`
  margin: 0 auto;
  padding: 50px 0px;
  z-index: 1;

  ${(props) =>
    props.submit &&
    `
   padding: 10px 0px;
  `}
`;

export const PlaceHolderImg = styled.Image`
  height: 400px;
  max-width: 100%;
  resize-mode: contain;
  width: 400px;
`;

export const TopRowBtnContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

// Splash Screen Components
export const PageLogo = styled.Image`
  height: 700px;
  width: 100%;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-content: center;
  color: ${purple};
  font-size: 24px;
`;

export const TextLink = styled.Pressable`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${green};
  font-size: 24px;
`;
export const SignupPageLogo = styled.Image`
  width: 100%;
  height: 200px;
`;
