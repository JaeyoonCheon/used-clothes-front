import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { faker } from "@faker-js/faker";
import { useSelector } from "react-redux";

import colors from "../lib/styles/colors";
import BaseLayout from "../components/layout/BaseLayout";
import { MiddleButton } from "../components/common/Button";
import { categoryData, itemDetailInfos } from "../lib/dummydata/dummydata";
import { ReactComponent as StarIcon } from "../asset/star.svg";

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
  padding-top: 100px;

  .item_summary {
    display: flex;

    justify-content: space-between;
  }
`;

const MainImageContainer = styled.div`
  .main_image {
    display: inline-block;
    vertical-align: top;
  }
`;

const ItemInfoContainer = styled.div`
  width: 400px;
  height: 580px;
  margin-left: auto;
  position: relative;
`;

const ItemPurchaseInfo = styled.div`
  padding-bottom: 10px;

  border-bottom: 0.3px solid ${colors.mono[1]};

  .item_title {
    margin: 0;
    margin-bottom: 30px;

    font-style: normal;
    font-weight: 400;
    font-size: 32px;
  }
  .item_price_container {
    width: 100%;
  }
  .item_shipping_fee {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: ${colors.mono[0]};
  }
  .item_enrolled_time {
    padding-top: 25px;

    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    color: ${colors.mono[0]};
  }
`;

const PriceStars = styled.div`
  width: 100%;
  display: flex;

  align-items: center;
  justify-content: space-between;

  .item_price {
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 43px;
  }
  .star_icon {
    margin-right: 5px;
  }
  .star_count {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: ${colors.blue[0]};
  }
`;

const ItemClassContainer = styled.div`
  width: 100%;
  padding: 10px 0;
  margin-bottom: 50px;

  .item_category {
    margin-bottom: 20px;

    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #000;
  }
`;

const ItemOptionList = styled.ul`
  margin: 0;
  padding: 0;

  .itemOption {
    display: block;
    margin-left: 20px;
    padding-bottom: 5px;

    list-style: none;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: ${colors.mono[0]};
  }
`;

const SellerInfoContainer = styled.div`
  width: 100%;
`;

const SellerInfo = styled.div`
  display: flex;
  margin-bottom: 15px;
  height: auto;
`;

const SellerIcon = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 15px;

  border-radius: 70%;
  overflow: hidden;

  .seller_image {
    display: block;
  }
`;

const SellerDetail = styled.div`
  height: 40px;

  .seller_name {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }
  .seller_items {
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
    color: ${colors.mono[0]};
  }
  .seller_location {
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 22px;
    color: ${colors.mono[0]};
  }
`;

const NavButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemDescription = styled.p`
  margin: 60px 0 300px 0;

  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
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

  const { email: currentUser } = useSelector((state) => ({
    email: state.auth.login.email,
  }));

  return (
    <BaseLayout>
      <Wrapper>
        <ItemDetailContainer>
          <div className="item_summary">
            <MainImageContainer>
              <img
                src={itemimage}
                className="main_image"
                alt="itemDetail"
              ></img>
            </MainImageContainer>
            <ItemInfoContainer>
              <ItemPurchaseInfo>
                <h2 className="item_title">{itemname}</h2>
                <div className="item_price_container">
                  <PriceStars>
                    <span className="item_price">{itemprice}원</span>
                    <div className="star_box">
                      <StarIcon className="star_icon"></StarIcon>
                      <span className="star_count">10</span>
                    </div>
                  </PriceStars>
                  <div className="item_shipping_fee">배송비 포함</div>
                  <div className="item_enrolled_time">1시간 전</div>
                </div>
              </ItemPurchaseInfo>
              <ItemClassContainer>
                <div className="item_category">상의 / 티셔츠</div>
                <ItemOptionList>
                  <li className="itemOption">색상: {itemColors.join(", ")}</li>
                  <li className="itemOption">브랜드: {brand}</li>
                  <li className="itemOption">사이즈: {itemsize}</li>
                  <li className="itemOption">재질: {textiles}</li>
                  <li className="itemOption">사용감: {pollution}</li>
                </ItemOptionList>
              </ItemClassContainer>
              <SellerInfoContainer>
                <SellerInfo>
                  <SellerIcon>
                    <img
                      src={faker.image.animals(40, 40)}
                      className="seller_image"
                      alt="seller_image"
                    />
                  </SellerIcon>
                  <SellerDetail>
                    <div className="seller_name">{sellerName}</div>
                    <div className="seller_items">
                      등록한 상품: {sellingItems}개
                    </div>
                    <span className="seller_location">
                      지역 : {currentLocation}
                    </span>
                  </SellerDetail>
                </SellerInfo>
              </SellerInfoContainer>
              <NavButtonContainer>
                {currentUser ? (
                  <>
                    <MiddleButton isFilled={true} colorTheme={colors.mono[0]}>
                      상품 삭제하기
                    </MiddleButton>
                    <MiddleButton isFilled={true} colorTheme={colors.mono[0]}>
                      상품 정보 수정
                    </MiddleButton>
                  </>
                ) : (
                  <>
                    <MiddleButton isFilled={true} colorTheme={colors.mono[0]}>
                      관심목록 추기
                    </MiddleButton>
                    <MiddleButton isFilled={true} colorTheme={colors.blue[0]}>
                      채팅하기
                    </MiddleButton>
                  </>
                )}
              </NavButtonContainer>
            </ItemInfoContainer>
          </div>
          <ItemDescription>{descriptions}</ItemDescription>
        </ItemDetailContainer>
      </Wrapper>
    </BaseLayout>
  );
};

export default ItemDetailPage;
