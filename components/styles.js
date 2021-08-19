import styled from 'styled-components';
import { View, Image} from 'react-native';
import { Dimensions } from 'react-native';

export const Colors = {
  green: "#50A561",
  blue: "#5BC0EB",
  palePink: "#EAD7D1",
  purple: "#7871AA",
  pink: "#D58593",
}

const { green, blue, palePink, purple, pink } = Colors;

export const StyledContainer = styled.View`
  flex: 1;
`
export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justifyContent: center;
`
export const PageLogo = styled.Image`
  width: 100%;
  height: 700px;
`
