import React from 'react';
import {
  StyledContainer,
  InnerContainer,
  PageLogo
} from '../components/styles'

const SplashScreen = () => {
  return (
    <StyledContainer>
      <InnerContainer>
        <PageLogo resizeMode="cover" source={require('../assets/rexLogoLinesWide.png')}/>
      </InnerContainer>
    </StyledContainer>
  );
}

export default SplashScreen;
