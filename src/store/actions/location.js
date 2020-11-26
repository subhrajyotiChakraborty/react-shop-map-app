import * as actionTypes from "./actionTypes";

export const fetchLocation = () => {
  return (dispatch) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(fetchLocationSuccess(position.coords));
        },
        () => {
          dispatch(fetchLocationError());
        }
      );
    }
  };
};

export const fetchLocationSuccess = (coords) => {
  return {
    type: actionTypes.FETCH_CURRENT_LOCATION,
    payload: coords,
  };
};

export const fetchLocationError = () => {
  return {
    type: actionTypes.FETCH_CURRENT_LOCATION_ERROR,
  };
};
