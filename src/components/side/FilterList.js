import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { CheckboxFilter } from "./Filter";
import { filterDatas } from "../../lib/dummydata/dummydata";

const FilterList = (props) => {
  const { options, onClickOption } = props;
  const [modalState, setModalState] = useState({ index: -1 });

  return filterDatas.map((filterData) => {
    const { typeCode, name, types } = filterData;

    return (
      <CheckboxFilter
        key={typeCode}
        typeCode={typeCode}
        name={name}
        types={types}
        options={options}
        onClickOption={onClickOption}
        modalState={modalState}
        setModalState={setModalState}
      ></CheckboxFilter>
    );
  });
};

export default FilterList;
