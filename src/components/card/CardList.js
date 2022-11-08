import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Card, { Card1 } from "./Card";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .product {
    margin-bottom: 40px;
    text-decoration: none;
    color: black;

    &:visited {
      text-decoration: none;
      color: black;
    }
  }
`;

const CardList = (props) => {
  const { itemDatas } = props;

  return (
    <Wrapper>
      {itemDatas.map((itemData) => {
        return (
          <Link
            to={`/product/:${itemData.id}`}
            key={itemData.id}
            className="product"
          >
            <Card1 itemData={itemData}></Card1>
          </Link>
        );
      })}
    </Wrapper>
  );
};

export default CardList;
