import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";

import { listProductsAPI } from "../lib/api/product";
import createRequestSaga from "../lib/saga/createRequestSaga";

const initialState = {
  options: {
    name: "",
    main_category: 0,
    sub_category: 0,
    min_price: 0,
    max_price: Infinity,
    condition_code: [],
    shippingfee: 0,
    brand_id: [],
    purchase_place_id: [],
    color_code: [],
    material_code: [],
    sorting: "최신 순",
    elements: 50,
    page: 1,
  },
  productList: [],
  listError: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    changeOption: {
      reducer: (state, action) => ({
        ...state,
        options: action.payload,
      }),
    },
    list: {
      reducer: (state, action) => ({
        state: action.payload,
      }),
      prepare: (payload) => {
        return {
          payload,
        };
      },
    },
    list_success: {
      reducer: (state, action) => ({
        ...state,
        listError: null,
        productList: action.payload,
      }),
      prepare: (payload) => {
        return {
          payload,
        };
      },
    },
    list_failure: {
      reducer: (state, action) => ({
        ...state,
        listError: action.error,
        productList: action.error,
      }),
      prepare: (payload) => {
        return {
          payload,
        };
      },
    },
  },
});

export const { list } = productSlice.actions;

const listSaga = createRequestSaga(list, listProductsAPI);

export function* productSaga() {
  yield takeLatest(list, listSaga);
}
