import React from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";

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

const CardContainer1 = styled.div`
  width: 280px;
  padding-bottom: 5px;
  background-color: white;
  display: flex;
  flex-direction: column;

  .itemname {
    height: 40px;
    margin: 5px 0px 0px 5px;
    overflow-y: hidden;

    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 19px;
  }
  .itemprice {
    margin-left: 5px;
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 33px;
  }
  .enrolltime {
    margin-left: 5px;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: ${colors.mono[0]};
  }
  &:hover {
    box-shadow: 0px 15px 15px rgba(197, 197, 197, 0.5);
    transition: box-shadow 0.1s linear;
  }

  cursor: pointer;
`;

export const Card1 = (props) => {
  const { itemData } = props;
  const {
    itemimage = "240x240.png",
    itemname = "itemname",
    itemprice = "10000",
    enrollTime = 1,
  } = itemData;

  return (
    <CardContainer1>
      <img src={itemimage} alt="item"></img>
      <span className="itemname">{itemname}</span>
      <span className="itemprice">{`${itemprice}원`}</span>
      <span className="enrolltime">{`${enrollTime}분 전`}</span>
    </CardContainer1>
  );
};
