import React, { useState } from "react";
import styled from "styled-components";

import Category from "./Category";
import Filter from "./Filter";

import { filterDatas } from "../../lib/dummydata/dummydata";

const AsideContainer = styled.div`
  width: 180px;
  margin-right: 20px;

  display: flex;
  flex-direction: column;
`;

const Aside = () => {
  const [modalState, setModalState] = useState({ index: -1 });

  return (
    <AsideContainer>
      <Category></Category>
      {filterDatas.map((filterData, i) => (
        <Filter
          key={i}
          idx={i}
          filteringData={filterData}
          modalState={modalState}
          setModalState={setModalState}
        ></Filter>
      ))}
    </AsideContainer>
  );
};

export default Aside;
