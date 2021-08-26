import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import Settings from '../screens/Settings'

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={MainScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name='Settings'
        component={Settings}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
