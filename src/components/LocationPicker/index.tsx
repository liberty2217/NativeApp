import React from 'react';
import { Button, Text, View } from 'react-native';
import { Colors } from '../../constants';
import { style as s } from './styles';

export const LocationPicker = () => {
  const getLocationHandler = () => {
    return null;
  };

  return (
    <View style={s.locationPicker}>
      <View style={s.mapPreview}>
        <Text>No location chosen yet</Text>
      </View>

      <Button title="Get User Location" color={Colors.primary} onPress={getLocationHandler} />
    </View>
  );
};
