import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { PlaceItem } from '../../components/PlaceItem';

import { PlacesStackParamList } from '../../navigation/PlacesNavigator';
import { loadPlaces } from '../../store/actions/places';
import { useAppDispatch, useAppSelector } from '../../store/app/rootReducer';

type Props = NativeStackScreenProps<PlacesStackParamList, 'PlaceList'>;

export const PlaceList: React.FC<Props> = (props) => {
  const { navigation } = props;
  const places = useAppSelector((state) => state.places.places);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageUri}
          onSelect={() => {
            navigation.navigate('PlaceDetail', { placeTitle: itemData.item.title, placeId: itemData.item.id });
          }}
          title={itemData.item.title}
          address={itemData.item.address}
        />
      )}
    />
  );
};
