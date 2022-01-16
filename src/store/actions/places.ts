import { ThunkAction } from '@reduxjs/toolkit';
import { vars } from '../../../env';
import { Location } from '../../components/LocationPicker';
import { fetchPlaces, insertPlace } from '../../helpers/database';
import { RootState } from '../app/rootReducer';
import { Place } from '../reducers/places';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export type ActionAddPlace = {
  type: typeof ADD_PLACE;
  // add cooords and address
  placeData: Place;
};

export type ActionSetPlaces = {
  type: typeof SET_PLACES;
  places: Place[];
};

export const addPlace = (
  title: Place['title'],
  imageUri: Place['imageUri'],
  location: Location,
): ThunkAction<void, RootState, unknown, ActionAddPlace> => {
  return async (dispatch) => {
    //extrach with reverse geolocation api -> converts lng/ltg to real address on map
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${vars.googleApiKey}`,
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();

    console.log(resData);

    if (!resData.response) {
      throw new Error('Something went wrong!');
    }

    // get the first address from array of suggested addresses (from lng/ltg picked on map)
    const address = resData.results[0].formatted_address;

    // save in sqlite3
    try {
      const dbResult = await insertPlace(title, imageUri, address, location.lat, location.lng);

      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId.toString(),
          title: title,
          imageUri: imageUri,
          address: address,
          coords: {
            lat: location.lat,
            lng: location.lng,
          },
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadPlaces = (): ThunkAction<void, RootState, unknown, ActionSetPlaces> => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();

      const temp: Place[] = [];

      // need to call given default method for each array item to get its value
      for (let i = 0; i < dbResult.rows.length; i++) {
        temp.push(dbResult.rows.item(i));
      }

      dispatch({ type: SET_PLACES, places: temp });
    } catch (err) {
      console.log('error occured in loadPlaces()');
      throw err;
    }
  };
};
