import { combineReducers } from "@reduxjs/toolkit";
import reducers from "../featue/redux/productSlice";
import cartReducer from "../featue/redux/cartSlice";
import mode from "../featue/redux/modeSlice";

const rootReducer = combineReducers({
  product: reducers,
  cart: cartReducer,
  mode: mode,
});
export default rootReducer;
