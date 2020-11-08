import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  loading: false,
  error: false,
  orders: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ORDER_START:
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.CREATE_ORDER_FAIL:
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case actionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        orders: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
