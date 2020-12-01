import { combineReducers } from "redux";

import locationReducer from "./locationReducer";
import shopReducer from "./shopReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  location: locationReducer,
  shops: shopReducer,
  orders: orderReducer,
});

export default rootReducer;
