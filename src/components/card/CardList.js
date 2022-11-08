import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Card from "./Card";

const Wrapper = styled.ul`
  padding: 0;
  width: 100%;
`;

const CardList = (props) => {
  const { itemDatas } = props;

  return (
    <Wrapper>
      {itemDatas.map((itemData) => {
        return <Card key={itemData.id} itemData={itemData}></Card>;
      })}
    </Wrapper>
  );
};

export default CardList;
