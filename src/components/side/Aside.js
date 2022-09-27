import React from "react";
import styled from "styled-components";

import Category from "./Category";
import Filter from "./Filter";

const AsideContainer = styled.div`
  width: 180px;
  margin-right: 20px;

  display: flex;
  flex-direction: column;
`;

const filterDatas = [
  {
    name: "색상",
    options: ["화이트", "블랙", "그레이", "브라운", "레드", "블루", "실버"],
  },
];

const Aside = () => {
  return (
    <AsideContainer>
      <Category></Category>
      {filterDatas.map((filterData, idx) => (
        <Filter key={idx} filteringData={filterData}></Filter>
      ))}
    </AsideContainer>
  );
};

export default Aside;
