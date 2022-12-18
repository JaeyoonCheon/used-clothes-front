import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import {
  ModalCheckboxFilter,
  CheckboxFilter,
  ColorCheckboxFilter,
  PriceFilter,
} from "./Filter";
import { searchBrand, addBrand } from "../../slices/brandSlice";
import {
  searchPurchasePlace,
  addPurchasePlace,
} from "../../slices/purchasePlaceSlice";
import {
  toggleBrandModal,
  togglePurchasePlaceModal,
} from "../../slices/modalSlice";

const brandActions = {
  search: searchBrand,
  add: addBrand,
  toggleModal: toggleBrandModal,
};
const purchasePlaceActions = {
  search: searchPurchasePlace,
  add: addPurchasePlace,
  toggleModal: togglePurchasePlaceModal,
};

const FilterList = (props) => {
  const { brands, colors, materials, conditions, purchasePlaces } = useSelector(
    (state) => {
      return {
        brands: state.brand.list,
        colors: state.metadata.colors,
        materials: state.metadata.materials,
        conditions: state.metadata.conditions,
        purchasePlaces: state.purchase_place.list,
      };
    }
  );

  return (
    <>
      <ModalCheckboxFilter
        title="브랜드"
        name="brand"
        list={brands}
        actions={brandActions}
      ></ModalCheckboxFilter>
      <ColorCheckboxFilter
        title="색상"
        name="color"
        list={colors}
      ></ColorCheckboxFilter>
      <CheckboxFilter
        title="소재"
        name="material"
        list={materials}
      ></CheckboxFilter>
      <CheckboxFilter
        title="상품 상태"
        name="condition"
        list={conditions}
      ></CheckboxFilter>
      <ModalCheckboxFilter
        title="구입처"
        name="purchase_place"
        list={purchasePlaces}
        actions={purchasePlaceActions}
      ></ModalCheckboxFilter>
      <PriceFilter title="가격" name="price"></PriceFilter>
    </>
  );
};

export default FilterList;
