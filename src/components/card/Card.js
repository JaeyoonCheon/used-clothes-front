import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import colors from "../../lib/styles/colors";
import makeUnitTime from "../../lib/utils/makeUnitTime";

const CardContainer = styled.li`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-right: 20px;
  margin-bottom: 40px;
  padding-bottom: 5px;
  background-color: white;
  display: inline-block;
  vertical-align: top;

  &:hover {
    box-shadow: 0px 15px 15px rgba(197, 197, 197, 0.5);
    transition: box-shadow 0.1s linear;
  }
  &:nth-child(4n + 4) {
    margin-right: 0;
  }
  cursor: pointer;
`;

const SmallCardContainer = styled(CardContainer)`
  width: 240px;
  min-height: 320px;
`;

const LargeCardContainer = styled(CardContainer)`
  width: 280px;
  min-height: 360px;
`;

const CardInfo = styled.div`
  .link {
    text-decoration: none;

    &:visited {
      text-decoration: none;
    }
    .itemname {
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 19px;
    }
  }
  .namebox {
    margin: 5px 0px 0px 5px;
    overflow-y: hidden;
  }
  .itemprice {
    margin-left: 5px;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
  }
  .enrolltime {
    margin-left: 5px;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: ${colors.mono[0]};
  }
`;

export const SmallCard = (props) => {
  const { itemData } = props;
  const {
    itemimage = "240x240.png",
    name = "itemname",
    price = "10000",
    upload_date = new Date(),
  } = itemData;

  const uploadedTime = makeUnitTime(upload_date);

  return (
    <SmallCardContainer>
      <div className="thumbnail">
        <Link to={`/product/${itemData.clothe_id}`} className="link">
          <img src={`240x240.png`} alt="item"></img>
        </Link>
      </div>
      <CardInfo>
        <div className="namebox">
          <Link to={`/product/${itemData.clothe_id}`} className="link">
            <span className="itemname">{name}</span>
          </Link>
        </div>
        <div className="pricebox">
          <span className="itemprice">{`${price}원`}</span>
        </div>
        <div className="timebox">
          <span className="enrolltime">{uploadedTime}</span>
        </div>
      </CardInfo>
    </SmallCardContainer>
  );
};

export const LargeCard = (props) => {
  const { itemData } = props;
  const {
    itemimage = "280x280.png",
    name = "itemname",
    price = "10000",
    upload_date = new Date(),
  } = itemData;

  const uploadedTime = makeUnitTime(upload_date);

  return (
    <LargeCardContainer>
      <div className="thumbnail">
        <Link to={`/product/${itemData.clothe_id}`} className="link">
          <img src={`280x280.png`} alt="item"></img>
        </Link>
      </div>
      <CardInfo>
        <div className="namebox">
          <Link to={`/product/${itemData.clothe_id}`} className="link">
            <span className="itemname">{name}</span>
          </Link>
        </div>
        <div className="pricebox">
          <span className="itemprice">{`${price}원`}</span>
        </div>
        <div className="timebox">
          <span className="enrolltime">{uploadedTime}</span>
        </div>
      </CardInfo>
    </LargeCardContainer>
  );
};
