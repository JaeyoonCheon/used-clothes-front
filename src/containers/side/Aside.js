import React, { useState } from "react";
import styled from "styled-components";

import Category from "./Category";
import Filter from "./Filter";

import { filterDatas } from "../../lib/dummydata/dummydata";
import FilterList from "./FilterList";

const AsideContainer = styled.aside`
  width: 140px;
  margin-right: 20px;

  display: flex;
  flex-direction: column;
`;

const Aside = (props) => {
  const { options, setOptions } = props;

  return (
    <AsideContainer>
      <Category></Category>
      <FilterList options={options} setOptions={setOptions}></FilterList>
    </AsideContainer>
  );
};

export default Aside;
