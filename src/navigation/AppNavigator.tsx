import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/HomeScreen'; // Main screen
import HeartRateZones from '../screens/HeartRateZones'; // Heart rate zone configuration screen

// Define types for navigation params
export type RootStackParamList = {
  Home: undefined; // No params for Home screen
  HeartRateZones: undefined; // No params for HeartRateZones screen
};

const Stack = createStackNavigator<RootStackParamList>(); // Pass types here

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="HeartRateZones" component={HeartRateZones} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
