import { combineReducers } from "@reduxjs/toolkit";
import reducers from "../featue/redux/productSlice";
import cartReducer from "../featue/redux/cartSlice";
const rootReducer = combineReducers({ product: reducers, cart: cartReducer });
export default rootReducer;
