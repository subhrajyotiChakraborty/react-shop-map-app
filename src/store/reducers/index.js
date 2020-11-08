import { combineReducers } from "redux";

import shopReducer from "./shopReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  shops: shopReducer,
  orders: orderReducer,
});

export default rootReducer;
