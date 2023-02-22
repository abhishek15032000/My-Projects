import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
  },
});
// registering all slices in the store
export default store;
