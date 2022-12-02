import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";

import { getMetadataAPI } from "../lib/api/metadata";
import createRequestSaga from "../lib/saga/createRequestSaga";

const initialState = {
  colors: [],
  materials: [],
  conditions: [],
  error: null,
};

export const metadataSlice = createSlice({
  name: "metadata",
  initialState,
  reducers: {
    getMetadata: () => {},
    getMetadata_success: (state, action) => {
      const metadatas = action.payload;

      state.colors = metadatas.colors;
      state.materials = metadatas.materials;
      state.conditions = metadatas.conditions;
    },
    getMetadata_failure: (state, action) => {
      state.error = action.error;
    },
  },
});

export const { getMetadata, getMetadata_success, getMetadata_failure } =
  metadataSlice.actions;

const getMetadataSaga = createRequestSaga(getMetadata, getMetadataAPI);

export function* metadataSaga() {
  yield takeLatest(getMetadata, getMetadataSaga);
}
