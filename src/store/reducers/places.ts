import { Location } from '../../components/LocationPicker';
import { ActionAddPlace, ActionSetPlaces, ADD_PLACE, SET_PLACES } from '../actions/places';

export type Place = {
  id: string;
  title: string;
  imageUri: string;
  address: string;
  coords: Location;
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
    case SET_PLACES: {
      return {
        places: action.places.map((pl) => ({
          id: pl.id,
          title: pl.title,
          imageUri: pl.imageUri,
          address: pl.address,
          coords: {
            lat: pl.coords?.lat,
            lng: pl.coords?.lng,
          },
        })),
      };
    }

    case ADD_PLACE: {
      const newPlace: Place = {
        id: action.placeData.id.toString(),
        title: action.placeData.title,
        imageUri: action.placeData.imageUri,
        address: action.placeData.address,
        coords: {
          lat: action.placeData.coords.lat,
          lng: action.placeData.coords.lng,
        },
      };

      return {
        places: state.places.concat(newPlace),
      };
    }

    default:
      return state;
  }
};
