import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  loading: false,
  error: false,
  center: {
    lat: 22.8956,
    lng: 88.4025,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CURRENT_LOCATION:
      return {
        ...state,
        error: false,
        center: {
          ...state.center,
          lat: action.payload.latitude,
          lng: action.payload.longitude,
        },
      };

    case actionTypes.FETCH_CURRENT_LOCATION_ERROR:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};

export default reducer;
