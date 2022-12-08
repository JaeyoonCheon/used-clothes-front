import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  brand: false,
  location: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleBrandModal: (state, action) => {
      state.brand = action.payload;
    },
    toggleLoginModal: (state, action) => {
      state.login = action.payload;
    },
    toggleLocationModal: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { toggleBrandModal, toggleLoginModal, toggleLocationModal } =
  modalSlice.actions;
