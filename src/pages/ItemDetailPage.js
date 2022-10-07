import React from "react";
import styled from "styled-components";
import { faker } from "@faker-js/faker";

import colors from "../lib/styles/colors";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { MiddleButton, LargeButton, Button } from "../components/common/Button";

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

  font-family: "Noto Serif";
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
  font-family: "Noto Serif";
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 49px;
`;

const DeliveryFee = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: ${colors.mono[0]};
`;

const Stars = styled.div`
  width: fit-content;
  margin-left: auto;
  color: ${colors.blue[0]};
`;

const ItemClassContainer = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

const ItemCategories = styled.div`
  margin-bottom: 15px;

  font-family: "Noto Serif";
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
  font-family: "Noto Serif";
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
  display: flex;

  .itemOption {
    margin-left: 10px;

    font-family: "Noto Serif";
    font-style: normal;
    font-weight: 100;
    font-size: 16px;
    line-height: 22px;
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
    font-family: "Noto Serif";
    font-style: normal;
    font-weight: 100;
    font-size: 20px;
    line-height: 27px;
  }
  .sellerItems {
    font-family: "Noto Serif";
    font-style: normal;
    font-weight: 100;
    font-size: 12px;
    line-height: 16px;
    color: ${colors.mono[0]};
  }
`;

const SellerPlace = styled.div`
  font-family: "Noto Serif";
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

const ItemDescription = styled.div`
  margin: 60px 0 300px 0;
`;

const ItemDetailPage = () => {
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
              목록으로
            </Button>
          </div>
          <ItemSummaryContainer>
            <ImageContainer>
              <img
                src={faker.image.abstract(580, 580)}
                className="itemImage"
                alt="itemDetail"
              ></img>
            </ImageContainer>
            <ItemInfoContainer>
              <ItemTitle>상품 명</ItemTitle>
              <ItemPriceContainer>
                <ItemPrice>10000원</ItemPrice>
                <DeliveryFee>배송비 포함</DeliveryFee>
                <Stars>star 10</Stars>
              </ItemPriceContainer>
              <ItemClassContainer>
                <ItemCategories>상의 &gt; 티셔츠</ItemCategories>
                <ItemOptionContainer>
                  <ItemOptionTitle>옵션</ItemOptionTitle>
                  <ItemOptionList>
                    <li className="itemOption">색상: 블랙</li>
                    <li className="itemOption">브랜드: 브랜드1</li>
                    <li className="itemOption">사이즈: M</li>
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
                    <div className="sellerName">판매자 1</div>
                    <div className="sellerItems">등록한 상품: 10개</div>
                  </SellerDetail>
                </SellerInfo>
                <SellerPlace>지역 : 대구광역시</SellerPlace>
              </SellerInfoContainer>
              <hr />
              <NavButtonContainer>
                <Button
                  width={180}
                  height={60}
                  backgroundColor={colors.mono[0]}
                  fontSize={20}
                >
                  관심목록
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
          <ItemDescription>{faker.lorem.paragraphs(3)}</ItemDescription>
        </ItemDetailContainer>
      </Wrapper>
      <Footer></Footer>
    </>
  );
};

export default ItemDetailPage;
