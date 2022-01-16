import React, { useCallback, useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import { styles as s } from './styles';
import { PlacesStackParamList } from '../../navigation/PlacesNavigator';
import { Location } from '../../components/LocationPicker';
import { RouteProp } from '@react-navigation/native';

type ScreenProps = {
  navigation: NativeStackNavigationProp<PlacesStackParamList, 'MapScreen'>;
  route: RouteProp<PlacesStackParamList, 'MapScreen'>;
};

export const MapScreen: React.FC<ScreenProps> = (props) => {
  const { navigation, route } = props;

  const { readonly, initialLocation } = { ...route.params };

  const [selectedLocation, setSelectedLocation] = useState<Location>(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event: MapEvent) => {
    // event is pre-built object of apple/google map data when we click on map

    if (readonly) {
      return;
    }

    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  const savePickedLocationHandler = useCallback(() => {
    //if user didnt tap any location -> save button does nothing:
    if (!selectedLocation) {
      return;
    }
    navigation.navigate('NewPlace', { pickedLocation: selectedLocation });
  }, [selectedLocation, navigation]);

  useEffect(() => {
    navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler, navigation]);

  return (
    <MapView style={s.map} region={mapRegion} onPress={selectLocationHandler}>
      {markerCoordinates && <Marker title="Picked Location" coordinate={markerCoordinates} />}
    </MapView>
  );
};
