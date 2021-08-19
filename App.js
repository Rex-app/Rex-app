import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CameraComponent from "./CameraComponent";

import MainScreen from './screens/MainScreen'
import SplashScreen from './screens/SplashScreen'

export default function App() {
  return (
    <MainScreen />
  );
}

