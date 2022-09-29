import React from "react";
import styled from "styled-components";

import Card from "./Card";

const Wrapper = styled.div`
  width: 980px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
