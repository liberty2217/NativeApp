import { ActionAddPlace, ActionSetPlaces, ADD_PLACE, SET_PLACES } from '../actions/places';

export type Place = {
  id: string;
  title: string;
  imageUri: string;
};

type InitialStateType = {
  places: Place[];
};

const initialState: InitialStateType = {
  places: [],
};

type Action = ActionAddPlace | ActionSetPlaces;

export const placesReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_PLACE: {
      const newPlace: Place = {
        id: action.placeData.id.toString(),
        title: action.placeData.title,
        imageUri: action.placeData.imageUri,
      };

      return {
        places: state.places.concat(newPlace),
      };
    }

    case SET_PLACES: {
      return {
        places: action.places.map((pl) => ({
          id: pl.id,
          title: pl.title,
          imageUri: pl.imageUri,
        })),
      };
    }

    default:
      return state;
  }
};
