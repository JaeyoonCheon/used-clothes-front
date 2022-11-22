import { createSlice } from "@reduxjs/toolkit";
import createRequestSaga from "../lib/saga/createRequestSaga";
import { loginAPI, registerAPI } from "../lib/api/user";
import { takeLatest } from "redux-saga/effects";

const initialState = {
  login: {
    email: "",
    password: "",
  },
  register: {
    email: "",
    name: "",
    password: "",
    phone: "",
  },
  auth: null,
  authError: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: {
      reducer: (state, action) => ({
        ...state,
        login: action.payload,
      }),
      prepare: ({ email, password }) => {
        return {
          payload: {
            email,
            password,
          },
        };
      },
    },
    login_success: {
      reducer: (state, action) => ({
        ...state,
        auth: action.payload,
      }),
      prepare: ({ email, password }) => {
        return {
          payload: {
            email,
            password,
          },
        };
      },
    },
    login_failure: {
      reducer: (state, action) => ({
        ...state,
        authError: action.error,
      }),
      prepare: ({ email, password }) => {
        return {
          payload: {
            email,
            password,
          },
        };
      },
    },
    register: {
      reducer: (state, action) => ({
        ...state,
        register: action.payload,
      }),
      prepare: ({ email, name, password, phone }) => {
        return {
          payload: {
            email,
            name,
            password,
            phone,
          },
        };
      },
    },
    register_success: {
      reducer: (state, action) => ({
        ...state,
        authError: null,
        auth: true,
      }),
      prepare: ({ email, name, password, phone }) => {
        return {
          payload: {
            email,
            name,
            password,
            phone,
          },
        };
      },
    },
    register_failure: {
      reducer: (state, action) => ({
        ...state,
        authError: true,
        error: action.error,
      }),
      prepare: ({ email, name, password, phone }) => {
        return {
          payload: {
            email,
            name,
            password,
            phone,
          },
        };
      },
    },
    check: {
      reducer: (state, action) => {},
    },
  },
});

export const { login, register } = authSlice.actions;

const loginSaga = createRequestSaga(login, loginAPI);
const registerSaga = createRequestSaga(register, registerAPI);

export function* authSaga() {
  yield takeLatest(login, loginSaga);
  yield takeLatest(register, registerSaga);
}
