import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";

import { getBrandListAPI } from "../lib/api/brand";
import createRequestSaga from "../lib/saga/createRequestSaga";

const initialState = {
  brandList: [],
  listSuccess: false,
  listError: null,
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    getBrandList: () => {},
    getBrandList_success: (state, action) => {
      state.brandList = action.payload;
      state.listSuccess = true;
    },
    getBrandList_failure: (state, action) => {
      state.listError = action.error;
    },
  },
});

export const { getBrandList, getBrandList_success, getBrandList_failure } =
  brandSlice.actions;

const getBrandListSaga = createRequestSaga(getBrandList, getBrandListAPI);

export function* brandSaga() {
  yield takeLatest(getBrandList, getBrandListSaga);
}
