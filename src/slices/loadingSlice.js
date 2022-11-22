import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    currentAccount: "",
  },
  reducers: {
    start: {
      reducer: (state, action) => {
        return {
          ...state,
          [action.payload]: true,
        };
      },
      prepare: (actionType) => {
        return {
          payload: {
            actionType,
          },
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
      prepare: (actionType) => {
        return {
          payload: {
            actionType,
          },
        };
      },
    },
  },
});

const { actions } = loadingSlice;

export const { start, finish } = actions;
