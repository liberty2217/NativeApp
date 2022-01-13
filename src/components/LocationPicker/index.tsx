import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, PermissionsAndroid, Platform, Text, View } from 'react-native';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';
import { Colors } from '../../constants';
import { MapPreview } from '../MapPreview';
import { style as s } from './styles';

export type Location = {
  lng: GeoCoordinates['longitude'];
  lat: GeoCoordinates['latitude'];
};

const getIOSlocationPermission = async () => {
  try {
    const res = await Geolocation.requestAuthorization('always');
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getAndroidPermission = async () => {
  await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
};

export const LocationPicker = () => {
  const [pickedLocation, setPickedLocation] = useState<Location>({});

  const [isFetching, setIsFetching] = useState(false);

  const getLocationHandler = async () => {
    let permission;
    if (Platform.OS === 'android') {
      permission = await getAndroidPermission();
    }
    permission = await getIOSlocationPermission();

    if (permission !== 'granted') {
      return Alert.alert('Permission is not granted');
    }

    try {
      setIsFetching(true);

      Geolocation.getCurrentPosition(
        (position) => {
          // success callback with result
          // set result of getCurrentPosition to our state
          setPickedLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          console.log(err);
          // error callback with failed result
        },
        { timeout: 5000 },
      );
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
      <MapPreview style={s.mapPreview} location={pickedLocation}>
        {isFetching ? <ActivityIndicator size="large" color={Colors.primary} /> : <Text>No location chosen yet</Text>}
      </MapPreview>

      <Button title="Get User Location" color={Colors.primary} onPress={getLocationHandler} />
    </View>
  );
};
