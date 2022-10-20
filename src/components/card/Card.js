import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  height: 240px;

  .itemname {
    font-weight: 100;
    font-size: 16px;
  }
  .itemprice {
    font-weight: 400;
    font-size: 20px;
  }
`;

const Card = (props) => {
  const { itemData } = props;
  const {
    itemimage = "180x180.png",
    itemname = "itemname",
    itemprice = "10000",
  } = itemData;

  return (
    <CardContainer>
      <img src={itemimage} alt="item"></img>
      <div className="itemname">{itemname}</div>
      <div className="itemprice">{`${itemprice}원`}</div>
    </CardContainer>
  );
};

export default Card;
