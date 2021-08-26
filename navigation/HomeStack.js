import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from '../screens/MainScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator headerShown='false'>
      <Stack.Screen name='Home' component={MainScreen} />
    </Stack.Navigator>
  );
}
