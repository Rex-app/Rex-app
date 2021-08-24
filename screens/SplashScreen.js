import React from 'react';

// Styled component imports
import {
  PageLogo,
  StyledContainer,
} from '../components/styles'

const SplashScreen = () => {
  return (
    <StyledContainer>
      <PageLogo resizeMode="cover" source={require('../assets/rexLogoLinesWide.png')} />
    </StyledContainer>
  );
}

export default SplashScreen;
