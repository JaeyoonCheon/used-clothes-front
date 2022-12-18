import { combineReducers } from "@reduxjs/toolkit";
import { all } from "redux-saga/effects";

import { authSlice, authSaga } from "./authSlice";
import { loadingSlice } from "./loadingSlice";
import { productSlice, productSaga } from "./productSlice";
import { categorySlice, categorySaga } from "./categorySlice";
import { metadataSlice, metadataSaga } from "./metadataSlice";
import { brandSlice, brandSaga } from "./brandSlice";
import { modalSlice } from "./modalSlice";
import { locationSlice, locationSaga } from "./locationSlice";
import { purchasePlaceSlice, purchasePlaceSaga } from "./purchasePlaceSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  loading: loadingSlice.reducer,
  product: productSlice.reducer,
  category: categorySlice.reducer,
  metadata: metadataSlice.reducer,
  brand: brandSlice.reducer,
  modal: modalSlice.reducer,
  location: locationSlice.reducer,
  purchase_place: purchasePlaceSlice.reducer,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    productSaga(),
    categorySaga(),
    metadataSaga(),
    brandSaga(),
    locationSaga(),
    purchasePlaceSaga(),
  ]);
}

export default rootReducer;
