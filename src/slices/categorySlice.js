import { createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

import createRequestSaga from "../lib/saga/createRequestSaga";
import { getMainCategoryAPI, getSubCategoryAPI } from "../lib/api/category";

const initialState = {
  main_category: [],
  sub_category: [],
  isLoaded: false,
  error: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategory: () => {},
    getCategory_success: (state, action) => {
      state.main_category = action.payload.mainCategory;
      state.sub_category = action.payload.subCategory;
      state.isLoaded = true;
    },
    getCategory_failure: (state, action) => {
      state.error = action.error;
      console.log(action.payload);
    },
  },
});

export const { getCategory, getCategory_success } = categorySlice.actions;

function* getCategorySaga() {
  try {
    const mainCategory = yield call(getMainCategoryAPI);
    const subCategory = yield call(getSubCategoryAPI);

    yield put({
      type: `${getCategory}_success`,
      payload: {
        mainCategory: mainCategory.data,
        subCategory: subCategory.data,
      },
    });
  } catch (e) {
    yield put({
      type: `${getCategory}_failure`,
      error: true,
      payload: e,
    });
  }
}

export function* categorySaga() {
  yield takeLatest(getCategory, getCategorySaga);
}
