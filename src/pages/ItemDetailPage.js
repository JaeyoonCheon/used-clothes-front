import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { faker } from "@faker-js/faker";

import colors from "../lib/styles/colors";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { MiddleButton, LargeButton, Button } from "../components/common/Button";
import { categoryData, itemDetailInfos } from "../lib/dummydata/dummydata";

const Wrapper = styled.div`
  width: 1180px;
  margin: auto;

  border: 0.3px solid ${colors.mono[1]};
  border-bottom: 1px solid transparent;
`;

const ItemDetailContainer = styled.div`
  width: 1015px;
  height: fit-content;
  margin: auto;

  .navButton-back {
    margin-top: 35px;
    margin-bottom: 25px;
  }
`;

const ItemSummaryContainer = styled.div`
  display: flex;
  margin: auto;
  margin-top: 20px;
`;

const ImageContainer = styled.div`
  .itemImage {
    display: block;
  }
`;

const ItemInfoContainer = styled.div`
  width: 400px;
  margin-left: 30px;
`;

const ItemTitle = styled.h2`
  margin: 0;
  margin-bottom: 30px;

  font-style: normal;
  font-weight: 100;
  font-size: 32px;
  line-height: 44px;
`;

const ItemPriceContainer = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;

const ItemPrice = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 49px;
`;

const DeliveryFee = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: ${colors.mono[0]};
`;

const Stars = styled.div`
  width: fit-content;
  margin-left: auto;

  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  color: ${colors.blue[0]};

  .starIcon {
    display: inline-block;
    width: 20px;
    height: 20px;
    fill: ${colors.blue[0]};
  }
`;

const ItemClassContainer = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

const ItemCategories = styled.div`
  margin-bottom: 15px;

  font-style: normal;
  font-weight: 100;
  font-size: 20px;
  line-height: 27px;
  color: ${colors.mono[0]};
`;

const ItemOptionContainer = styled.div`
  width: 100%;
`;

const ItemOptionTitle = styled.div`
  font-style: normal;
  font-weight: 100;
  font-size: 16px;
  line-height: 22px;
  color: ${colors.mono[0]};
`;

const ItemOptionList = styled.ul`
  margin: 0;
  margin-left: 10px;
  padding: 0;

  list-style: none;

  .itemOption {
    margin-left: 10px;

    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
    color: ${colors.mono[0]};
  }
`;

const SellerInfoContainer = styled.div`
  width: 100%;
  margin-bottom: 70px;
`;

const SellerInfo = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const SellerIcon = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 15px;

  border-radius: 70%;
  overflow: hidden;

  .sellerImage {
    display: block;
  }
`;

const SellerDetail = styled.div`
  .sellerName {
    font-style: normal;
    font-weight: 100;
    font-size: 20px;
    line-height: 27px;
  }
  .sellerItems {
    font-style: normal;
    font-weight: 100;
    font-size: 12px;
    line-height: 16px;
    color: ${colors.mono[0]};
  }
`;

const SellerPlace = styled.div`
  font-style: normal;
  font-weight: 100;
  font-size: 16px;
  line-height: 22px;
  color: ${colors.mono[0]};
`;

const NavButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;

const ItemDescription = styled.p`
  margin: 60px 0 300px 0;
`;

const ItemDetailPage = () => {
  const params = useParams();
  const { paramsId } = params;

  // 비동기로 구현해야하는 부분이나, 더미데이터로 우선 동작 구현
  const gotItem = itemDetailInfos;

  const {
    id,
    itemimage,
    itemname,
    itemprice,
    category,
    options,
    seller,
    descriptions,
  } = gotItem;
  const { large, medium, small } = category;
  const {
    colors: itemColors,
    brand,
    textiles,
    pollution,
    size: itemsize,
  } = options;
  const { sellerId, name: sellerName, sellingItems, currentLocation } = seller;

  return (
    <>
      <Header></Header>
      <Wrapper>
        <ItemDetailContainer>
          <div className="navButton-back">
            <Button
              width={120}
              height={40}
              border={colors.mono[1]}
              color={colors.mono[0]}
              fontSize={12}
            >
              &lt; 목록으로
            </Button>
          </div>
          <ItemSummaryContainer>
            <ImageContainer>
              <img src={itemimage} className="itemImage" alt="itemDetail"></img>
            </ImageContainer>
            <ItemInfoContainer>
              <ItemTitle>{itemname}</ItemTitle>
              <ItemPriceContainer>
                <ItemPrice>{itemprice}원</ItemPrice>
                <DeliveryFee>배송비 포함</DeliveryFee>
                <Stars>
                  <img
                    className="starIcon"
                    src={process.env.PUBLIC_URL + "/star.png"}
                    alt="star"
                  />
                  <span>10</span>
                </Stars>
              </ItemPriceContainer>
              <ItemClassContainer>
                <ItemCategories>상의 / 티셔츠</ItemCategories>
                <ItemOptionContainer>
                  <ItemOptionTitle>옵션</ItemOptionTitle>
                  <ItemOptionList>
                    <li className="itemOption">
                      색상: {itemColors.join(", ")}
                    </li>
                    <li className="itemOption">브랜드: {brand}</li>
                    <li className="itemOption">사이즈: {itemsize}</li>
                    <li className="itemOption">재질: {textiles}</li>
                    <li className="itemOption">사용감: {pollution}</li>
                  </ItemOptionList>
                </ItemOptionContainer>
              </ItemClassContainer>
              <SellerInfoContainer>
                <SellerInfo>
                  <SellerIcon>
                    <img
                      src={faker.image.animals(40, 40)}
                      className="sellerImage"
                      alt="sellerIcon"
                    />
                  </SellerIcon>
                  <SellerDetail>
                    <div className="sellerName">{sellerName}</div>
                    <div className="sellerItems">
                      등록한 상품: {sellingItems}개
                    </div>
                  </SellerDetail>
                </SellerInfo>
                <SellerPlace>지역 : {currentLocation}</SellerPlace>
              </SellerInfoContainer>
              <hr />
              <NavButtonContainer>
                <Button
                  width={180}
                  height={60}
                  backgroundColor={colors.mono[0]}
                  fontSize={20}
                >
                  관심목록 추가
                </Button>
                <Button
                  width={180}
                  height={60}
                  backgroundColor={colors.blue[0]}
                  fontSize={20}
                >
                  채팅하기
                </Button>
              </NavButtonContainer>
            </ItemInfoContainer>
          </ItemSummaryContainer>
          <ItemDescription>{descriptions}</ItemDescription>
        </ItemDetailContainer>
      </Wrapper>
      <Footer></Footer>
    </>
  );
};

export default ItemDetailPage;
