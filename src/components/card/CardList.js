import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { SmallCard, LargeCard } from "./Card";

const Wrapper = styled.ul`
  padding: 0;
  width: 100%;
`;

export const SmallCardList = (props) => {
  const { itemDatas } = props;

  console.log(`itemDatas : ${itemDatas}`);

  return (
    <Wrapper>
      {itemDatas &&
        itemDatas.map((itemData) => {
          return (
            <SmallCard key={itemData.clothe_id} itemData={itemData}></SmallCard>
          );
        })}
    </Wrapper>
  );
};

export const LargeCardList = (props) => {
  const { itemDatas } = props;

  console.log(`itemDatas : ${itemDatas}`);

  return (
    <Wrapper>
      {itemDatas &&
        itemDatas.map((itemData) => {
          return <LargeCard key={itemData.id} itemData={itemData}></LargeCard>;
        })}
    </Wrapper>
  );
};
