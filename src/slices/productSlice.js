import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";

import {
  listProductAPI,
  getProductAPI,
  addProductAPI,
  modifyProductAPI,
  deleteProductAPI,
} from "../lib/api/product";
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
      },
      sort_by: "upload_date",
      order: "asc",
      elements: 30,
      page: 1,
    },
    location: "서울특별시",
    scope_a_code: 11,
    scope_b_code: null,
    scope_c_code: null,
    listError: null,
    isLoaded: true,
    isEnd: false,
    isListSuccess: false,
    productList: [],
  },
  detail: {
    currentProduct: {
      clothe_id: null,
      itemimage: [],
      user_email: "",
      name: "",
      main_category_id: null,
      sub_category_id: null,
      price: null,
      condition_code: [],
      shipping_fee: null,
      upload_date: null,
      upload_time: null,
      brand_id: [],
      purchase_place_id: [],
      ex_price: null,
      color_code: [],
      purchase_date: null,
      material_code: [],
      description: "",
    },
    detailSuccess: false,
    detailError: null,
  },
  selected: {
    clothe_id: null,
    itemimage: [],
    user_email: "",
    name: "",
    main_category_id: null,
    sub_category_id: null,
    price: null,
    condition_code: [],
    shipping_fee: null,
    upload_date: null,
    upload_time: null,
    brand_id: [],
    purchase_place_id: [],
    ex_price: null,
    color_code: [],
    purchase_date: null,
    material_code: [],
    description: "",
  },
  addError: null,
  modifyError: null,
  deleteError: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadProduct: (state, action) => {
      state.selected = state.detail.currentProduct;
    },
    changeFilter: (state, action) => {
      state.list.options.filter[action.payload.name] = action.payload.value;
    },
    changeOption: (state, action) => {
      state.list.options[action.payload.name] = action.payload.value;
    },
    listProduct: () => {},
    listProduct_success: (state, action) => {
      state.list.listError = null;
      state.list.isListSuccess = true;
      state.list.productList = action.payload;
    },
    listProduct_failure: (state, action) => {
      state.list.isListSuccess = false;
      state.list.listError = action.error;
    },
    listNextProduct: (state) => {
      state.list.isLoaded = false;
    },
    listNextProduct_success: (state, action) => {
      console.log(action.payload);
      state.list.listError = null;
      state.list.isLoaded = true;
      state.list.productList = [...state.list.productList, ...action.payload];
      if (action.payload.length === 0) {
        state.list.isEnd = true;
      }
    },
    listNextProduct_failure: (state, action) => {
      state.list.listError = action.error;
    },
    getProduct: () => {},
    getProduct_success: (state, action) => {
      state.detail.detailSuccess = true;
      state.detail.currentProduct = action.payload;
    },
    getProduct_failure: (state, action) => {
      state.detail.detailError = action.error;
    },
    changeSelected: (state, action) => {
      state.selected[action.payload.name] = action.payload.value;
    },
    addProduct: () => {},
    addProduct_success: (state, action) => {
      state.selected.product = initialState.selected.product;
    },
    addProduct_failure: (state, action) => {
      state.addError = action.error;
    },
    modifyProduct: () => {},
    modifyProduct_success: (state, action) => {
      state.selected.product = initialState.selected.product;
    },
    modifyProduct_failure: (state, action) => {
      state.modifyError = action.error;
    },
    deleteProduct: () => {},
    deleteProduct_success: (state, action) => {
      state.selected.delete = initialState.selected.product;
    },
    deleteProduct_failure: (state, action) => {
      state.selected.deleteError = action.error;
    },
  },
});

export const {
  loadProduct,
  changeFilter,
  changeOption,
  listProduct,
  listProduct_success,
  listProduct_failure,
  listNextProduct,
  listNextProduct_success,
  listNextProduct_failure,
  getProduct,
  getProduct_success,
  getProduct_failure,
  changeSelected,
  addProduct,
  addProduct_success,
  addProduct_failure,
  modifyProduct,
  modifyProduct_success,
  modifyProduct_failure,
  deleteProduct,
  deleteProduct_success,
  deleteProduct_failure,
} = productSlice.actions;

const listProductSaga = createRequestSaga(listProduct, listProductAPI);
const listNextProductSaga = createRequestSaga(listNextProduct, listProductAPI);
const getProductSaga = createRequestSaga(getProduct, getProductAPI);
const addProductSaga = createRequestSaga(addProduct, addProductAPI);
const modifyProductSaga = createRequestSaga(modifyProduct, modifyProductAPI);
const deleteProductSaga = createRequestSaga(deleteProduct, deleteProductAPI);

export function* productSaga() {
  yield takeLatest(listProduct, listProductSaga);
  yield takeLatest(listNextProduct, listNextProductSaga);
  yield takeLatest(getProduct, getProductSaga);
  yield takeLatest(addProduct, addProductSaga);
  yield takeLatest(modifyProduct, modifyProductSaga);
  yield takeLatest(deleteProduct, deleteProductSaga);
}
