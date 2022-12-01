import { createSlice } from "@reduxjs/toolkit";
import createRequestSaga from "../lib/saga/createRequestSaga";
import { loginAPI, registerAPI } from "../lib/api/user";
import { takeLatest } from "redux-saga/effects";

const initialState = {
  auth: null,
  authError: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: () => {},
    login_success: (state, action) => {
      state.auth = action.payload;
    },
    login_failure: (state, action) => {
      state.authError = action.error;
    },
    register: () => {},
    register_success: (state, action) => {
      state.authError = null;
      state.auth = null;
    },
    register_failure: (state, action) => {
      state.authError = true;
      state.error = action.error;
    },
    check: () => {},
  },
});

export const { login, register } = authSlice.actions;

const loginSaga = createRequestSaga(login, loginAPI);
const registerSaga = createRequestSaga(register, registerAPI);

export function* authSaga() {
  yield takeLatest(login, loginSaga);
  yield takeLatest(register, registerSaga);
}
