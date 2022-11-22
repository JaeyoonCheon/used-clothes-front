import { combineReducers } from "@reduxjs/toolkit";
import { all } from "redux-saga/effects";

import { authSlice, authSaga } from "./authSlice";
import { loadingSlice } from "./loadingSlice";
import { userSlice } from "./userSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  loading: loadingSlice.reducer,
  user: userSlice.reducer,
});

export function* rootSaga() {
  yield all([authSaga()]);
}

export default rootReducer;
