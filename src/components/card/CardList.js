import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Card from "./Card";

const Wrapper = styled.div`
  width: 980px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

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
            <Card itemData={itemData}></Card>
          </Link>
        );
      })}
    </Wrapper>
  );
};

export default CardList;
