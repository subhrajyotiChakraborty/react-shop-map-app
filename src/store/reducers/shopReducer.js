import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  loading: false,
  error: false,
  shops: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.CREATE_SHOP_START:
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.CREATE_SHOP_FAIL:
    case actionTypes.FETCH_SHOPS_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case actionTypes.CREATE_SHOP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case actionTypes.FETCH_SHOPS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        shops: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
