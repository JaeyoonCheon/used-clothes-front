import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Filter, { CheckboxFilter } from "./Filter";
import { filterDatas } from "../../lib/dummydata/dummydata";

const FilterList = (props) => {
  const { options, setOptions } = props;
  const [modalState, setModalState] = useState({ index: -1 });

  return filterDatas.map((filterData) => {
    const { typeCode, name, types } = filterData;

    return (
      <CheckboxFilter
        key={typeCode}
        idx={typeCode}
        name={name}
        types={types}
        setOptions={setOptions}
        modalState={modalState}
        setModalState={setModalState}
      ></CheckboxFilter>
    );
  });
};

export default FilterList;
