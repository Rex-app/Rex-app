import React, { useCallback, useEffect, useState }  from 'react';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import Login from './screens/Login';
import * as Speech from 'expo-speech';
import ScreenGraphics from './screens/SplashScreen';

export default function App() {
const [appIsReady, setAppIsReady] = useState(false);
const speak = (thingToSay) => {
  Speech.speak(thingToSay);
};

// useEffect(() => {
//   async function prepare () {
//     try {
//       await SplashScreen.preventAutoHideAsync();
//       speak("Please sign up to get started, or log in if you have an account");
//       await new Promise(resolve => setInterval(resolve, 8000)); //BLAH
//     } catch (e) {
//       console.log(e);
//     } finally {
//       setAppIsReady(true);
//     }
//   }
//   prepare();
// }, []);

 const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return  <ScreenGraphics />;
  }

  return (
    <View
    onLayout={onLayoutRootView}>
   <Login /> 
   </View>
  );
}