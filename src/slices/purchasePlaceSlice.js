import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";

import { listPlaceAPI, addPlaceAPI } from "../lib/api/purchasePlace";
import createRequestSaga from "../lib/saga/createRequestSaga";

const initialState = {
  list: [],
  listSuccess: false,
  listError: null,
  searchPurchasePlace: "",
  addSuccess: false,
  addError: null,
};

export const purchasePlaceSlice = createSlice({
  name: "purchasePlace",
  initialState,
  reducers: {
    getPurchasePlaceList: () => {},
    getPurchasePlaceList_success: (state, action) => {
      state.list = action.payload;
      state.listSuccess = true;
    },
    getPurchasePlaceList_failure: (state, action) => {
      state.listError = action.error;
    },
    searchPurchasePlace: (state, action) => {
      state.searchPurchasePlace = action.payload;
    },
    addPurchasePlace: () => {},
    addPurchasePlace_success: (state, action) => {
      state.addSuccess = true;
    },
    addPurchasePlace_failure: (state, action) => {
      state.addError = action.error;
    },
  },
});

export const {
  getPurchasePlaceList,
  getPurchasePlaceList_success,
  getPurchasePlaceList_failure,
  searchPurchasePlace,
  addPurchasePlace,
  addPurchasePlace_success,
  addPurchasePlace_failure,
} = purchasePlaceSlice.actions;

const getPurchasePlaceListSaga = createRequestSaga(
  getPurchasePlaceList,
  listPlaceAPI
);
const addPurchasePlaceSaga = createRequestSaga(addPurchasePlace, addPlaceAPI);

export function* purchasePlaceSaga() {
  yield takeLatest(getPurchasePlaceList, getPurchasePlaceListSaga);
  yield takeLatest(addPurchasePlace, addPurchasePlaceSaga);
}
