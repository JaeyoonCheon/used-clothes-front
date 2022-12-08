import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";

import {
  getScopeAListAPI,
  getScopeBListAPI,
  getScopeCListAPI,
} from "../lib/api/location";
import createRequestSaga from "../lib/saga/createRequestSaga";

const initialState = {
  list: {
    scopeA: [],
    scopeB: [],
    scopeC: [],
  },
  listSuccess: false,
  listError: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    getScopeAList: () => {},
    getScopeAList_success: (state, action) => {
      state.list.scopeA = action.payload;
      state.listSuccess = true;
    },
    getScopeAList_failure: (state, action) => {
      state.listError = action.error;
    },
    getScopeBList: () => {},
    getScopeBList_success: (state, action) => {
      state.list.scopeB = action.payload;
      state.listSuccess = true;
    },
    getScopeBList_failure: (state, action) => {
      state.listError = action.error;
    },
    getScopeCList: () => {},
    getScopeCList_success: (state, action) => {
      state.list.scopeC = action.payload;
      state.listSuccess = true;
    },
    getScopeCList_failure: (state, action) => {
      state.listError = action.error;
    },
  },
});

export const { getScopeAList, getScopeBList, getScopeCList } =
  locationSlice.actions;

const getScopeAListSaga = createRequestSaga(getScopeAList, getScopeAListAPI);
const getScopeBListSaga = createRequestSaga(getScopeBList, getScopeBListAPI);
const getScopeCListSaga = createRequestSaga(getScopeCList, getScopeCListAPI);

export function* locationSaga() {
  yield takeLatest(getScopeAList, getScopeAListSaga);
  yield takeLatest(getScopeBList, getScopeBListSaga);
  yield takeLatest(getScopeCList, getScopeCListSaga);
}
