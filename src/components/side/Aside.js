import React, { useState } from "react";
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
  {
    name: "소재",
    options: ["면", "데님", "가죽", "실크", "폴리에스테르", "레이온", "기모"],
  },
  {
    name: "오염도",
    options: ["미사용", "매우양호", "사용감 있음", "사용감 많음"],
  },
  {
    name: "사이즈",
    options: ["S", "M", "L", "XL", "XXS", "XS", "XXL"],
  },
];

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
