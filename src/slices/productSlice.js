import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";

import { listProductsAPI } from "../lib/api/product";
import createRequestSaga from "../lib/saga/createRequestSaga";

const initialState = {
  list: {
    options: {
      name: "",
      main_category_id: 0,
      sub_category_id: 0,
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
    sort_by: "upload_date",
    order: "asc",
    elements: "30",
    page: "1",
  },
  productList: [],
  listError: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    changeOption: (state, action) => {
      state.list.options[action.payload.name] = action.payload.value;
    },
    changeArrayOption: (state, action) => {
      if (!state.list.options[action.payload.name]) {
        state.list.options[action.payload.name] = [];
      }
      state.list.options[action.payload.name] = action.payload.value;
    },
    list: () => {},
    list_success: (state, action) => {
      state.listError = null;
      state.productList = action.payload;
    },
    list_failure: (state, action) => {
      state.listError = action.error;
      state.productList = action.error;
    },
    getProduct: () => {},
  },
});

export const {
  changeOption,
  changeArrayOption,
  list,
  list_success,
  list_failure,
} = productSlice.actions;

const listSaga = createRequestSaga(list, listProductsAPI);

export function* productSaga() {
  yield takeLatest(list, listSaga);
}
