import React from "react";
import styled from "styled-components";

import Card from "./Card";

const Wrapper = styled.div`
  width: 980px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const renderCards = () => {
  const cardList = [];
  for (let i = 0; i < 6; i++) {
    const row = [];
    for (let j = 0; j < 5; j++) {
      row.push(<Card key={j}></Card>);
    }
    cardList.push(<Row key={i}>{row.map((item) => item)}</Row>);
  }
  return cardList;
};

const CardList = () => {
  const cards = renderCards();
  console.log(cards);
  return <Wrapper>{cards}</Wrapper>;
};

export default CardList;
