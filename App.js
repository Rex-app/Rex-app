import React from 'react';
import AppLoading from 'expo-app-loading';

import Routes from './navigation/index';

export default function App() {
  return <Routes />;
}

//setInterval to however long the audio is
/*
const [appIsReady, setAppIsReady] = useState(false);

useEffect(() => {
  async function splashScreen () {
    try {
      setInterval BLAH
    } catch (e) {
      console.log(e);
    } finally {
      setAppIsReady(true);
    }
  }
  splashScreen();
}, []);

 const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      onLayout={onLayoutRootView}>
      ***SPLASH SCREEN***
    </View>
  );
} */
