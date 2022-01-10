import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PlaceNavigator } from './PlacesNavigator';
export const AppNavigator = () => {
  // listen to autologout

  return (
    <NavigationContainer>
      <PlaceNavigator />
    </NavigationContainer>
  );
};
