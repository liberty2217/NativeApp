import { Place } from '../reducers/places';

export const ADD_PLACE = 'ADD_PLACE';

export type AddPlaceAction = {
  type: typeof ADD_PLACE;
  placeData: Place;
};

export const addPlace = (title: Place['title']) => {
  return {
    type: ADD_PLACE,
    placeData: {
      title: title,
    },
  };
};
