import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";

import { getBrandListAPI, addBrandAPI } from "../lib/api/brand";
import createRequestSaga from "../lib/saga/createRequestSaga";

const initialState = {
  list: [],
  listSuccess: false,
  listError: null,
  searchBrand: "",
  addSuccess: false,
  addError: null,
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    getBrandList: () => {},
    getBrandList_success: (state, action) => {
      state.list = action.payload;
      state.listSuccess = true;
    },
    getBrandList_failure: (state, action) => {
      state.listError = action.error;
    },
    searchBrand: (state, action) => {
      state.searchBrand = action.payload;
    },
    addBrand: () => {},
    addBrand_success: (state, action) => {
      state.addSuccess = true;
    },
    addBrand_failure: (state, action) => {
      state.addError = action.error;
    },
  },
});

export const {
  getBrandList,
  getBrandList_success,
  getBrandList_failure,
  searchBrand,
  addBrand,
  addBrand_success,
  addBrand_failure,
} = brandSlice.actions;

const getBrandListSaga = createRequestSaga(getBrandList, getBrandListAPI);
const addBrandSaga = createRequestSaga(addBrand, addBrandAPI);

export function* brandSaga() {
  yield takeLatest(getBrandList, getBrandListSaga);
  yield takeLatest(addBrand, addBrandSaga);
}
