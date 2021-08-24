import { Image, SafeAreaView, View } from 'react-native';
import styled from 'styled-components';
import { TouchableOpacity } from 'react'

// Color scheme
export const Colors = {
  blue: "#5BC0EB",
  green: "#50A561",
  palePink: "#EAD7D1",
  pink: "#D58593",
  purple: "#7871AA",
}

// Shared Components
export const StyledContainer = styled.SafeAreaView`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 25px;
`;

// Main Screen Components
export const BottomRowBtnContainer = styled.View`
  width: 100%;
`;

export const CapturedImageContainer = styled.View`
  align-items: center;
  height: 500px;
  justify-content: center;
  width: 100%;
`;

export const ExternalButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  width: 100%;
`;

export const InnerContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 90%;
`;


export const LongButton = styled.TouchableOpacity`
  margin: 0 auto;
  padding: 50px 0px;
  zIndex: 1;

  ${(props) => props.submit && `
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
  width: 100%
`;

// Splash Screen Components
export const PageLogo = styled.Image`
  height: 700px;
  width: 100%;
`;
