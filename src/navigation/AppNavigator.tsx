import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
export const AppNavigator = () => {
  // listen to autologout

  return (
    <NavigationContainer>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>initial plain screen</Text>
      </View>
    </NavigationContainer>
  );
};
