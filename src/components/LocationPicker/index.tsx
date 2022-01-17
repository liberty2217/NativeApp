import React, { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActivityIndicator, Alert, Button, PermissionsAndroid, Platform, Text, View } from 'react-native';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';
import { Colors } from '../../constants';
import { PlacesStackParamList } from '../../navigation/PlacesNavigator';
import { MapPreview } from '../MapPreview';
import { style as s } from './styles';
import { RouteProp } from '@react-navigation/native';

export type Location = {
  lng: GeoCoordinates['longitude'];
  lat: GeoCoordinates['latitude'];
};

const getIOSlocationPermission = async () => {
  try {
    const res = await Geolocation.requestAuthorization('always');
    return res;
  } catch (err) {
    Alert.alert('Permission is not granted');
  }
};

const getAndroidPermission = async () => {
  await PermissionsAndroid.request('android.permission.ACCESS_FINE_LOCATION');
};

type LocationPickerProps = {
  parentNavigation: NativeStackNavigationProp<PlacesStackParamList, 'NewPlace'>;
  parentRoute: RouteProp<PlacesStackParamList, 'NewPlace'>;
  onLocationPicked: (location: Location) => void;
};

export const LocationPicker: React.FC<LocationPickerProps> = (props) => {
  const { parentNavigation, parentRoute, onLocationPicked } = props;

  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState<Location>({});

  const mapPickedLocation = parentRoute.params?.pickedLocation;

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);

  const getLocationHandler = async () => {
    let permission;
    if (Platform.OS === 'android') {
      permission = await getAndroidPermission();
    } else {
      permission = await getIOSlocationPermission();
    }

    // if (permission !== 'granted') {
    //   return Alert.alert('Permission is not granted');
    // }

    try {
      setIsFetching(true);

      Geolocation.getCurrentPosition(
        (position) => {
          // success callback with result
          setPickedLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          onLocationPicked({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          // error callback with failed result
          Alert.alert('Error in getting current position', err.message);
        },
        { timeout: 5000 },
      );
    } catch (err) {
      Alert.alert('Could not fetch location', 'Pleace try again later or pick a location on the map', [
        { text: 'Okay' },
      ]);
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    parentNavigation.navigate('MapScreen');
  };

  return (
    <View style={s.locationPicker}>
      <MapPreview style={s.mapPreview} location={pickedLocation} onPress={pickOnMapHandler}>
        {isFetching ? <ActivityIndicator size="large" color={Colors.primary} /> : <Text>No location chosen yet</Text>}
      </MapPreview>

      <View style={s.actions}>
        <Button title="Get User Location" color={Colors.primary} onPress={getLocationHandler} />
        <Button title="Pick on map" color={Colors.primary} onPress={pickOnMapHandler} />
      </View>
    </View>
  );
};
