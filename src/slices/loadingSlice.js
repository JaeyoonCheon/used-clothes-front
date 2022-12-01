import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    start: {
      reducer: (state, action) => {
        return {
          ...state,
          [action.payload]: true,
        };
      },
    },
    finish: {
      reducer: (state, action) => {
        return {
          ...state,
          [action.payload]: false,
        };
      },
    },
  },
});

const { actions } = loadingSlice;

export const { start, finish } = actions;
