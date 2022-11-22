import { combineReducers } from "@reduxjs/toolkit";
import { all } from "redux-saga/effects";

import { authSlice, authSaga } from "./authSlice";
import { loadingSlice } from "./loadingSlice";
import { userSlice } from "./userSlice";
import { productSlice, productSaga } from "./productSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  loading: loadingSlice.reducer,
  user: userSlice.reducer,
  product: productSlice.reducer,
});

export function* rootSaga() {
  yield all([authSaga(), productSaga()]);
}

export default rootReducer;
