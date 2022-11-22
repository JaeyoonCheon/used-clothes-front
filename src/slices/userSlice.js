import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    currentUser: {
      reducer: (state, action) => ({
        ...state,
        user: action.payload,
      }),
      prepare: ({ email }) => {
        return {
          payload: {
            email,
          },
        };
      },
    },
  },
});

export const { currentUser } = userSlice.actions;
