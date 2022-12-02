import { combineReducers } from "@reduxjs/toolkit";
import { all } from "redux-saga/effects";

import { authSlice, authSaga } from "./authSlice";
import { loadingSlice } from "./loadingSlice";
import { productSlice, productSaga } from "./productSlice";
import { metadataSlice, metadataSaga } from "./metadataSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  loading: loadingSlice.reducer,
  product: productSlice.reducer,
  metadata: metadataSlice.reducer,
});

export function* rootSaga() {
  yield all([authSaga(), productSaga(), metadataSaga()]);
}

export default rootReducer;
