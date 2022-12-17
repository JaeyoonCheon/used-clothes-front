import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, batch } from "react-redux";

import colors from "../lib/styles/colors";
import BaseLayout from "../components/layout/BaseLayout";
import Aside from "../components/side/Aside";
import { SmallCardList } from "../components/card/CardList";
import {
  listProduct,
  listNextProduct,
  changeFilter,
  changeOption,
} from "../slices/productSlice";
import { getCategory } from "../slices/categorySlice";
import { getMetadata } from "../slices/metadataSlice";
import { getBrandList } from "../slices/brandSlice";
import { getPurchasePlaceList } from "../slices/purchasePlaceSlice";
import { toggleLocationModal } from "../slices/modalSlice";
import LocationModal from "../components/modal/LocationModal";
import useIntersect from "../hooks/useIntersect";

const HomePageContainer = styled.div`
  display: flex;
  margin: 0 auto;
  margin-bottom: 300px;
  width: 1180px;

  .aside_category_option {
    padding-top: 40px;
    margin-left: auto;
  }
`;

const HeaderSpacer = styled.div`
  height: 60px;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 101vh;
  margin-right: auto;
`;

const NavBar = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;

  .user_location {
    display: flex;
    align-items: center;

    cursor: pointer;
  }
  .location_name {
    margin-right: 5px;
    font-weight: 400;
    font-size: 20px;
  }
  .location_icon {
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  .sort_orders {
    display: flex;

    align-items: center;
    justify-content: end;

    span {
      color: ${colors.mono[0]};
      font-weight: 400;
      font-size: 14px;

      cursor: pointer;

      &.active {
        color: ${colors.blue[0]};
      }
    }
    span:nth-child(n + 2)::before {
      content: "|";
      color: ${colors.mono[0]};
      margin: 0 1px 0 1px;
    }
  }
`;

const sortOrders = [
  { sort_by: "upload_date", order: "asc", name: "최신 순" },
  { sort_by: "upload_date", order: "desc", name: "이전 순" },
  { sort_by: "price", order: "asc", name: "가격 높은 순" },
  { sort_by: "price", order: "desc", name: "가격 낮은 순" },
];

const HomePage = () => {
  const dispatch = useDispatch();
  const { isLoginModal, isLocationModal } = useSelector((state) => {
    return {
      isLoginModal: state.modal.login,
      isLocationModal: state.modal.location,
    };
  });
  const {
    filter,
    sort_by,
    order,
    elements,
    page,
    location,
    scope_a_code,
    scope_b_code,
    scope_c_code,
  } = useSelector((state) => {
    const list = state.product.list;
    const options = state.product.list.options;

    return {
      filter: options.filter,
      sort_by: options.sort_by,
      order: options.order,
      elements: options.elements,
      page: options.page,
      location: list.location,
      scope_a_code: list.scope_a_code,
      scope_b_code: list.scope_b_code,
      scope_c_code: list.scope_c_code,
    };
  });
  const { productList, isListSuccess, isListLoaded, isEnd } = useSelector(
    ({ product }) => ({
      productList: product.list.productList,
      isListSuccess: product.list.isListSuccess,
      isListLoaded: product.list.isLoaded,
      isEnd: product.list.isEnd,
    })
  );

  useEffect(() => {
    console.log("Fetch by new options");
    batch(() => {
      dispatch(getCategory());
      dispatch(getMetadata("colors"));
      dispatch(getBrandList());
      dispatch(getPurchasePlaceList());
    });
  }, []);
  useEffect(() => {
    dispatch(listProduct({ filter, sort_by, order, elements, page }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filter,
    sort_by,
    order,
    elements,
    scope_a_code,
    scope_b_code,
    scope_c_code,
  ]);
  useEffect(() => {
    return () => {
      dispatch(
        changeOption({
          name: "isEnd",
          value: false,
        })
      );
    };
  }, []);

  const onClickLocation = () => {
    dispatch(toggleLocationModal(true));
  };
  const onClickSort = (sortOrder) => {
    batch(() => {
      dispatch(
        changeOption({
          name: "sort_by",
          value: sortOrder.sort_by,
        })
      );
      dispatch(
        changeOption({
          name: "order",
          value: sortOrder.order,
        })
      );
    });
  };
  const onClickOption = (typeCode, option) => {
    dispatch(
      changeFilter({
        name: typeCode,
        value: option,
      })
    );
  };

  function fetchNextPage(page) {
    if (!isEnd) {
      dispatch(
        listNextProduct({
          filter,
          sort_by,
          order,
          elements,
          page: Number(page) + 1,
        })
      );
      dispatch(changeOption({ name: "page", value: Number(page) + 1 }));
    }
  }

  const [_, setRef] = useIntersect(async (entry, observer, page) => {
    observer.unobserve(entry.target);
    fetchNextPage(page);
  }, {});

  return (
    <BaseLayout>
      <HeaderSpacer></HeaderSpacer>
      <HomePageContainer>
        <div className="aside_category_option">
          <Aside options={filter} onClickOption={onClickOption}></Aside>
        </div>
        <ContentContainer>
          <NavBar>
            <div className="user_location" onClick={onClickLocation}>
              <span className="location_name">{location}</span>
              <img
                className="location_icon"
                src="location.svg"
                alt="location"
              ></img>
            </div>
            {isLocationModal && <LocationModal></LocationModal>}
            <div className="sort_orders">
              {sortOrders.map((sortOrder) => {
                return (
                  <span
                    className={
                      sort_by === sortOrder.sort_by && order === sortOrder.order
                        ? "active"
                        : ""
                    }
                    key={`${sortOrder.sort_by} ${sortOrder.order}`}
                    onClick={() => onClickSort(sortOrder)}
                  >{`${sortOrder.name}`}</span>
                );
              })}
            </div>
          </NavBar>
          <SmallCardList itemDatas={productList}></SmallCardList>
          <hr></hr>
          {isListSuccess && isListLoaded && !isEnd && (
            <p ref={setRef}> Loading ... </p>
          )}
        </ContentContainer>
      </HomePageContainer>
    </BaseLayout>
  );
};

export default HomePage;
