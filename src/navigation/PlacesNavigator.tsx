import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlaceList } from '../screens/PlacesList';
import { PlaceDetail } from '../screens/PlaceDetail';
import { NewPlace } from '../screens/NewPlace';
import { MapScreen } from '../screens/MapScreen';
import { Platform } from 'react-native';
import { Colors } from '../constants';
import { IconButton } from '../components/UI/IconButton';
import plus from '../assets/icons/plus';

export type PlacesStackParamList = {
  PlaceList: undefined;
  NewPlace: undefined;
  PlaceDetail: undefined;
  MapScreen: undefined;
};

const defualtNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const Place = createNativeStackNavigator<PlacesStackParamList>();

export const PlaceNavigator = () => {
  return (
    <Place.Navigator screenOptions={defualtNavigationOptions}>
      <Place.Screen
        name="PlaceList"
        component={PlaceList}
        options={({ navigation, route }) => ({
          title: 'All Places',
          headerRight: () => {
            return (
              <IconButton icon={plus({ color: Colors.primary })} onPress={() => navigation.navigate('NewPlace')} />
            );
          },
        })}
      />

      <Place.Screen name="PlaceDetail" component={PlaceDetail} />

      <Place.Screen name="NewPlace" component={NewPlace} options={{ title: 'Add Place' }} />

      <Place.Screen name="MapScreen" component={MapScreen} />
    </Place.Navigator>
  );
};
