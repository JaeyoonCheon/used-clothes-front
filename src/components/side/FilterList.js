import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { CheckboxFilter } from "./Filter";
import { filterDatas } from "../../lib/dummydata/dummydata";

const FilterList = (props) => {
  const { options, onClickOption } = props;
  const [modalState, setModalState] = useState({ index: -1 });

  const { colors, materials, conditions } = useSelector((state) => {
    return {
      colors: state.metadata.colors,
      materials: state.metadata.materials,
      conditions: state.metadata.conditions,
    };
  });

  return (
    <>
      <CheckboxFilter
        title="색상"
        name="color"
        list={colors}
        onClickOption={onClickOption}
        modalState={modalState}
        setModalState={setModalState}
      ></CheckboxFilter>
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
    </>
  );
};

export default FilterList;
