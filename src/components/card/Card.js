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

const Card = () => {
  return (
    <CardContainer>
      <img src="180x180.png" alt="item"></img>
      <div className="itemname">item</div>
      <div className="itemprice">10000원</div>
    </CardContainer>
  );
};

export default Card;
