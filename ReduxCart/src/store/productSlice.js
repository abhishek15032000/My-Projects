import React from "react";

import { createSlice } from "@reduxjs/toolkit";
// to prevent from outside changing
export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});
//destructuring
export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

// TO MAKE API REQUEST WE USE THUNK AS WE CANNOT DO API REQUEST IN REDUCERS AS THEY ARE SYNCHRONOUS FUNCTIONS

// THUNKS returns a function

export function fetchProducts() {
  return async function fetchProductThunk(dispatch, getState) {
    //get state used to current state getState().property
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      dispatch(setProducts(data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
