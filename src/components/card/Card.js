import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  height: 240px;

  .itemname {
    font-family: "Noto Sans KR";
    font-weight: 100;
    font-size: 16px;
  }
  .itemprice {
    font-family: "Noto Serif";
    font-weight: 400;
    font-size: 20px;
  }
`;

const Card = (props) => {
  const { itemname = "item", itemprice = "20000원" } = props;
  return (
    <CardContainer>
      <img src="180x180.png" alt="item"></img>
      <div className="itemname">{itemname}</div>
      <div className="itemprice">{itemprice}</div>
    </CardContainer>
  );
};

export default Card;
