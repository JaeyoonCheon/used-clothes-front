import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentAccount: "",
  },
  reducers: {
    login: {
      reducer: (state, action) => {
        return {
          ...state,
          currentAccount: action.payload,
        };
      },
      prepare: (userEmail) => {
        return {
          payload: {
            userEmail,
          },
        };
      },
    },
  },
});

const { actions, reducer } = userSlice;

export const { login } = actions;
