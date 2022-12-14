import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { faker } from "@faker-js/faker";
import { batch, useDispatch, useSelector } from "react-redux";

import colors from "../lib/styles/colors";
import BaseLayout from "../components/layout/BaseLayout";
import { MiddleButton } from "../components/common/Button";
import { itemDetailInfos } from "../lib/dummydata/dummydata";
import { ReactComponent as StarIcon } from "../asset/star.svg";
import { getProduct, deleteProduct } from "../slices/productSlice";
import { getBrandList } from "../slices/brandSlice";
import { getMetadata } from "../slices/metadataSlice";
import makeUnitTime from "../lib/utils/makeUnitTime";

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
  .description_title {
    margin-top: 20px;
    padding-bottom: 20px;

    border-bottom: 1px solid ${colors.mono[1]};
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #000;
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
    display: flex;
    margin-left: 20px;
    align-items: center;

    list-style: none;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: ${colors.mono[0]};

    .item_option_unit {
      margin-left: 5px;
    }
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
  margin: 30px 0 300px 0;

  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
`;

const ColorBox = styled.div`
  width: 22px;
  height: 22px;
  margin: 3px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${(props) => props.color};
  border: 0.5px solid #eeeeee;
`;

const ItemDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { id: productId } = params;

  const dispatch = useDispatch();

  const {
    colorList,
    materialList,
    conditionList,
    brandList,
    placeList,
    mainCategory,
    subCategory,
  } = useSelector((state) => {
    return {
      colorList: state.metadata.colors,
      materialList: state.metadata.materials,
      conditionList: state.metadata.conditions,
      brandList: state.brand.list,
      placeList: state.purchase_place.list,
      mainCategory: state.category.main_category,
      subCategory: state.category.sub_category,
    };
  });
  const { product, getProductSuccess } = useSelector((state) => {
    return {
      getProductSuccess: state.product.detail.detailSuccess,
      product: state.product.detail.currentProduct,
    };
  });

  useEffect(() => {
    batch(() => {
      dispatch(getMetadata("color"));
      dispatch(getMetadata("materials"));
      dispatch(getMetadata("conditions"));
      dispatch(getBrandList());
      dispatch(getProduct(productId));
    });
  }, [dispatch, productId]);

  const {
    clothe_id,
    images,
    user_email,
    name,
    main_category_id,
    sub_category_id,
    price,
    condition_code,
    shipping_fee,
    upload_date,
    upload_time,
    brand_id,
    purchase_place_id,
    ex_price,
    color_code,
    purchase_date,
    material_code,
    description,
  } = product;

  const { seller } = itemDetailInfos;
  const { sellerId, name: sellerName, sellingItems, currentLocation } = seller;

  const { auth: currentUser } = useSelector((state) => ({
    auth: state.auth.auth,
  }));

  const onClickCancel = () => {
    dispatch(deleteProduct(productId));
    navigate(-1);
  };

  const purchasePlaceInfo = placeList.find(
    (listItem) => listItem.purchase_place_id === purchase_place_id
  );

  const uploadedTime = makeUnitTime(upload_date);
  const mappedMainCategory = mainCategory.find(
    (item) => item.main_category_id === main_category_id
  );
  const mappedSubCategory = subCategory.find(
    (item) => item.sub_category_id === sub_category_id
  );

  const parsedUD = new Date(Date.parse(upload_date));
  const parsedPD = new Date(Date.parse(purchase_date));

  console.log(product);
  console.log(typeof images);

  return (
    <BaseLayout>
      <Wrapper>
        {getProductSuccess && (
          <ItemDetailContainer>
            <div className="item_summary">
              <MainImageContainer>
                {images === "undefined" ? (
                  <img
                    src="https://loremflickr.com/580/580/abstract?21730"
                    className="main_image"
                    alt="itemDetail"
                  ></img>
                ) : (
                  images.map((image) => (
                    <img
                      src={image}
                      key={image}
                      className="main_image"
                      alt="itemDetail"
                    ></img>
                  ))
                )}
                {/**/}
              </MainImageContainer>
              <ItemInfoContainer>
                <ItemPurchaseInfo>
                  <h2 className="item_title">{name}</h2>
                  <div className="item_price_container">
                    <PriceStars>
                      <span className="item_price">{price}???</span>
                      <div className="star_box">
                        <StarIcon className="star_icon"></StarIcon>
                        <span className="star_count">10</span>
                      </div>
                    </PriceStars>
                    <div className="item_shipping_fee">
                      {shipping_fee
                        ? `????????? : ${shipping_fee}???`
                        : "????????? ??????"}
                    </div>
                    <div className="item_enrolled_time">{uploadedTime}</div>
                  </div>
                </ItemPurchaseInfo>
                <ItemClassContainer>
                  <div className="item_category">
                    {`${mappedMainCategory.main_category_name} /
                    ${mappedSubCategory.sub_category_name}`}
                  </div>
                  <ItemOptionList>
                    <li className="itemOption">
                      ??????:{" "}
                      <ul>
                        {color_code.map((code) => {
                          const mappedColor = colorList.find(
                            (listItem) => listItem.code === code
                          );
                          return (
                            <li key={mappedColor.code}>
                              <ColorBox
                                color={mappedColor.code}
                                name={mappedColor.name}
                              ></ColorBox>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                    <li className="itemOption">
                      ?????????:{" "}
                      <ul className="itemOptionDetail">
                        {brand_id.map((code) => {
                          const mappedBrand = brandList.find(
                            (listItem) => listItem.brand_id === code
                          );
                          return (
                            <li key={mappedBrand.brand_id}>
                              {mappedBrand.name}
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                    <li className="itemOption">
                      ??????:{" "}
                      <ul>
                        {material_code.map((code) => {
                          const mappedMaterial = materialList.find(
                            (listItem) => listItem.code === code
                          );
                          return (
                            <li
                              key={mappedMaterial.code}
                              className="item_option_unit"
                            >
                              {mappedMaterial.name}
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                    <li className="itemOption">
                      ??????:{" "}
                      <ul>
                        {condition_code.map((code) => {
                          const mappedCondition = conditionList.find(
                            (listItem) => listItem.code === code
                          );
                          return (
                            <li key={mappedCondition.code}>
                              {mappedCondition.name}
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                    <li className="itemOption">
                      ?????????:{" "}
                      <ul>
                        <li key={purchasePlaceInfo.purchase_place_id}>
                          {purchasePlaceInfo.name}
                        </li>
                      </ul>
                    </li>
                    <li className="itemOption">{`????????????: ${parsedPD.getFullYear()}??? ${
                      parsedPD.getMonth() + 1
                    }??? ${parsedPD.getDay()}???`}</li>
                    <li className="itemOption">{`????????? ??????: ${parsedUD.getFullYear()}??? ${
                      parsedUD.getMonth() + 1
                    }??? ${parsedUD.getDay()}??? ${parsedUD.getHours()}??? ${parsedUD.getMinutes()}???`}</li>
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
                        ????????? ??????: {sellingItems}???
                      </div>
                      <span className="seller_location">
                        ?????? : {currentLocation}
                      </span>
                    </SellerDetail>
                  </SellerInfo>
                </SellerInfoContainer>
                <NavButtonContainer>
                  {currentUser ? (
                    <>
                      <MiddleButton
                        isFilled={true}
                        colorTheme={colors.mono[0]}
                        onClick={onClickCancel}
                      >
                        ?????? ????????????
                      </MiddleButton>
                      <Link to={`/modifyItem/${productId}`}>
                        <MiddleButton
                          isFilled={true}
                          colorTheme={colors.mono[0]}
                        >
                          ?????? ?????? ??????
                        </MiddleButton>
                      </Link>
                    </>
                  ) : (
                    <>
                      <MiddleButton isFilled={true} colorTheme={colors.mono[0]}>
                        ???????????? ??????
                      </MiddleButton>
                      <MiddleButton isFilled={true} colorTheme={colors.blue[0]}>
                        ????????????
                      </MiddleButton>
                    </>
                  )}
                </NavButtonContainer>
              </ItemInfoContainer>
            </div>
            <div className="description_title">
              <span>?????? ??????</span>
            </div>
            <ItemDescription>{description}</ItemDescription>
          </ItemDetailContainer>
        )}
      </Wrapper>
    </BaseLayout>
  );
};

export default ItemDetailPage;
