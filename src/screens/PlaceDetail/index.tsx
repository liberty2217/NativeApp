import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Text, ScrollView, Image, View } from 'react-native';
import { MapPreview } from '../../components/MapPreview';
import { PlacesStackParamList } from '../../navigation/PlacesNavigator';
import { useAppSelector } from '../../store/app/rootReducer';
import { styles as s } from './styles';

type Props = NativeStackScreenProps<PlacesStackParamList, 'PlaceDetail'>;

export const PlaceDetail: React.FC<Props> = (props) => {
  const { navigation, route } = props;
  const { placeId } = route.params;

  const selectedPlace = useAppSelector((state) => state.places.places.find((place) => place.id === placeId));

  if (!selectedPlace) {
    return (
      <View style={s.centered}>
        <Text>Cannot find selected place. Please, try later!</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={s.sav}>
      <Image style={s.image} source={{ uri: selectedPlace.imageUri }} />
      <View style={s.locationContainer}>
        <View style={s.addressContainer}>
          <Text style={s.address}>{selectedPlace.address}</Text>
        </View>
        <MapPreview style={s.mapPreview} location={{ lat: selectedPlace.coords.lat, lng: selectedPlace.coords.lng }} />
      </View>
    </ScrollView>
  );
};
