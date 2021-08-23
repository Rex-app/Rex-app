import React from 'react';

// Styled component imports
import {
  InnerContainer,
  PageLogo,
  StyledContainer,
} from '../components/styles'

const SplashScreen = () => {
  return (
    <StyledContainer>
      <InnerContainer>
        <PageLogo resizeMode="cover" source={require('../assets/rexLogoLinesWide.png')} />
      </InnerContainer>
    </StyledContainer>
  );
}

export default SplashScreen;
