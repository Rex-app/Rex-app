import React, { useCallback, useEffect, useState }  from 'react';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import Routes from './navigation/index';
import * as Speech from 'expo-speech';

export default function App() {
//setInterval to however long the audio is

const [appIsReady, setAppIsReady] = useState(false);

useEffect(() => {
  async function splashScreen () {
    try {

      await new Promise(resolve => setInterval(resolve, 8000)); //BLAH
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
    onLayout={onLayoutRootView}>
   <Routes /> 
   </View>
  );
}

