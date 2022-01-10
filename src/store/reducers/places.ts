import { AddPlaceAction, ADD_PLACE, Place } from '../actions/places';

type InitialStateType = {
  places: Place[];
};

const initialState: InitialStateType = {
  places: [],
};

type Action = AddPlaceAction;

export const placesReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_PLACE: {
      const newPlace = {
        id: new Date().toString(),
        title: action.placeData.title,
      };

      return {
        places: state.places.concat(newPlace),
      };
    }

    default:
      return state;
  }
};