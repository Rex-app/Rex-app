import React, { useContext, useState, useEffect } from "react";
import Login from "./screens/Login";
import MainScreen from "./screens/MainScreen";
import SplashScreen from "./screens/SplashScreen";
import Signup from "./screens/Signup"
import auth from '@react-native-firebase/auth';
import { AuthContext } from "./AuthProvider";
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if(initializing) setInitializing(false);
  }
  
  //is onAuthStateChanged decremented?
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
  <NavigationContainer>
    { user ? <MainScreen /> : <Login /> }
  </NavigationContainer>
  );
}
