import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { Colors } from '../../constants';
import { style as s } from './styles';

const getIOSlocationPermission = async () => {
  try {
    const res = await Geolocation.requestAuthorization('always');
    return res;
  } catch (err) {
    console.log(err);
  }

  // console.log(res);
};

export const LocationPicker = () => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const getLocationHandler = async () => {
    const permission = await getIOSlocationPermission();

    if (permission !== 'granted') {
      return Alert.alert('Permission is not granted');
    }

    try {
      setIsFetching(true);
      const location = await Geolocation.getCurrentPosition(
        (position) => {
          console.log('success in getting location');
          console.log(position);

          setPickedLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          console.log('fail in getting location');
          console.log(err);
        },
        { timeout: 5000 },
      );
      console.log(location);

      console.log(pickedLocation);
    } catch (err) {
      console.log(err);
      Alert.alert('Could not fetch location', 'Pleace try again later or pick a location on the map', [
        { text: 'Okay' },
      ]);
    }
    setIsFetching(false);
  };

  return (
    <View style={s.locationPicker}>
      <View style={s.mapPreview}>
        {isFetching ? <ActivityIndicator size="large" color={Colors.primary} /> : <Text>No location chosen yet</Text>}
      </View>

      <Button title="Get User Location" color={Colors.primary} onPress={getLocationHandler} />
    </View>
  );
};
