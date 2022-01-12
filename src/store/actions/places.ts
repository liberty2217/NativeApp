import { ThunkAction } from '@reduxjs/toolkit';
import { fetchPlaces, insertPlace } from '../../helpers/database';
import { RootState } from '../app/rootReducer';
import { Place } from '../reducers/places';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export type ActionAddPlace = {
  type: typeof ADD_PLACE;
  placeData: Place;
};

export type ActionSetPlaces = {
  type: typeof SET_PLACES;
  places: Place[];
};

export const addPlace = (
  title: Place['title'],
  imageUri: Place['imageUri'],
): ThunkAction<void, RootState, unknown, ActionAddPlace> => {
  return async (dispatch) => {
    try {
      const dbResult = await insertPlace(title, imageUri, 'Dummy address', 15.6, 12.3);

      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId.toString(),
          title: title,
          imageUri: imageUri,
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
