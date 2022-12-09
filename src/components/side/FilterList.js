import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import {
  ModalCheckboxFilter,
  CheckboxFilter,
  ColorCheckboxFilter,
  PriceFilter,
} from "./Filter";
import { filterDatas } from "../../lib/dummydata/dummydata";

const FilterList = (props) => {
  const { options, onClickOption } = props;
  const [modalState, setModalState] = useState({ index: -1 });

  const { brands, colors, materials, conditions, purchasePlaces } = useSelector(
    (state) => {
      return {
        brands: state.brand.list,
        colors: state.metadata.colors,
        materials: state.metadata.materials,
        conditions: state.metadata.conditions,
        purchasePlaces: state.purchasePlace.list,
      };
    }
  );

  return (
    <>
      <ModalCheckboxFilter
        title="브랜드"
        name="brand"
        list={brands}
      ></ModalCheckboxFilter>
      <ColorCheckboxFilter
        title="색상"
        name="color"
        list={colors}
        onClickOption={onClickOption}
        modalState={modalState}
        setModalState={setModalState}
      ></ColorCheckboxFilter>
      <CheckboxFilter
        title="소재"
        name="material"
        list={materials}
        onClickOption={onClickOption}
        modalState={modalState}
        setModalState={setModalState}
      ></CheckboxFilter>
      <CheckboxFilter
        title="상품 상태"
        name="condition"
        list={conditions}
        onClickOption={onClickOption}
        modalState={modalState}
        setModalState={setModalState}
      ></CheckboxFilter>
      <ModalCheckboxFilter
        title="구입처"
        name="purchasePlace"
        list={purchasePlaces}
      ></ModalCheckboxFilter>
      <PriceFilter title="가격" name="price"></PriceFilter>
    </>
  );
};

export default FilterList;
