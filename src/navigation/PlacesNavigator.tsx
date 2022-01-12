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
import { Place } from '../store/reducers/places';

export type PlacesStackParamList = {
  PlaceList: undefined;
  NewPlace: undefined;
  PlaceDetail: { placeTitle: Place['title']; placeId: Place['id'] };
  MapScreen: undefined;
};

export const defualtNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const PlaceStack = createNativeStackNavigator<PlacesStackParamList>();

export const PlaceNavigator = () => {
  return (
    <PlaceStack.Navigator screenOptions={defualtNavigationOptions}>
      <PlaceStack.Screen
        name="PlaceList"
        component={PlaceList}
        options={({ navigation }) => ({
          title: 'All Places',
          headerRight: () => {
            return (
              <IconButton
                icon={plus({ color: Platform.OS === 'android' ? '#fff' : Colors.primary })}
                onPress={() => navigation.navigate('NewPlace')}
              />
            );
          },
        })}
      />

      <PlaceStack.Screen
        name="PlaceDetail"
        component={PlaceDetail}
        options={({ route }) => ({ title: route.params.placeTitle })}
      />

      <PlaceStack.Screen name="NewPlace" component={NewPlace} options={{ title: 'Add Place' }} />

      <PlaceStack.Screen name="MapScreen" component={MapScreen} />
    </PlaceStack.Navigator>
  );
};
