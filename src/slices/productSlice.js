import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";

import { listProductsAPI } from "../lib/api/product";
import createRequestSaga from "../lib/saga/createRequestSaga";

const initialState = {
  list: {
    options: {
      filter: {
        name: "",
        main_category_id: null,
        sub_category_id: null,
        min_price: null,
        max_price: Infinity,
        condition_code: [],
        shippingfee: null,
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
    listError: null,
    productList: [],
  },
  detail: {
    currentProduct: {
      clothe_id: null,
      user_email: "",
      name: "",
      main_category_id: null,
      sub_category_id: null,
      price: null,
      condition_code: null,
      shipping_fee: null,
      upload_date: null,
      upload_time: null,
      brand_id: null,
      purchase_place_id: null,
      ex_price: null,
      color_code: null,
      purchase_date: null,
      material_code: null,
      description: "",
    },
    detailError: null,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    changeOption: (state, action) => {
      state.list.options.filter[action.payload.name] = action.payload.value;
    },
    changeArrayOption: (state, action) => {
      if (!state.list.options.filter[action.payload.name]) {
        state.list.options[action.payload.name] = [];
      }
      state.list.options.filter[action.payload.name] = action.payload.value;
    },
    list: () => {},
    list_success: (state, action) => {
      state.list.listError = null;
      state.list.productList = action.payload;
    },
    list_failure: (state, action) => {
      state.list.listError = action.error;
      state.list.productList = action.error;
    },
    getProduct: () => {},
    getProduct_success: (state, action) => {
      state.detail.currentProduct = action.payload;
    },
    getProduct_failure: (state, action) => {},
    changeProduct: () => {},
    changeProduct_success: () => {},
    changeProduct_failure: () => {},
    addProduct: () => {},
    addProduct_success: () => {},
    addProduct_failure: () => {},
    modifyProduct: () => {},
    modifyProduct_success: () => {},
    modifyProduct_failure: () => {},
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
