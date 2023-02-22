/**
 * we can break our data into small pieces
 * in order to maintain those
 */

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      state.splice(action.payload, 1);
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;

/**
 * reducers used to mutate our states
 * are pure functions
 */
