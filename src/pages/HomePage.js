import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";

import colors from "../lib/styles/colors";
import BaseLayout from "../components/layout/BaseLayout";
import Aside from "../components/side/Aside";
import { SmallCardList } from "../components/card/CardList";
import Pagination from "../components/common/Pagination";
import { listProductsAPI, testListProductsAPI } from "../lib/api/product";
import { list } from "../slices/productSlice";

import { itemDatas } from "../lib/dummydata/dummydata";
import { useDispatch } from "react-redux";

const Wrapper = styled.div``;

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
  margin-right: auto;
`;

const NavBar = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;

  .user_location {
    display: flex;
    align-items: center;
  }
  .location_name {
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
      margin: 0 1px 0 1px;
    }
  }
`;

const location = "산격동";

const sortOrders = ["최신 순", "가격 높은 순", "가격 낮은 순", "거리 순"];

const HomePage = () => {
  const [sortOption, setSortOption] = useState("최신 순");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(50);
  const [options, setOptions] = useState({
    name: "",
    main_category: 0,
    sub_category: 0,
    min_price: 0,
    max_price: Infinity,
    condition_code: [],
    shippingfee: 0,
    brand_id: [],
    purchase_place_id: [],
    color_code: [],
    material_code: [],
    sorting: sortOption,
    elements: pageLimit,
    page: currentPage,
  });

  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const { options: productOptions } = createSelector((state) => ({
    options: state.product.options,
  }));

  useEffect(() => {
    console.log("Fetch new options");
    listProductsAPI(options).then((result) => {
      console.log(result.data);
      setProducts(result.data);
    });
  }, [options]);

  const onClickSort = (order) => {
    const prevState = options;

    setSortOption(order);
    setOptions((prev) => ({
      ...prev,
      sorting: order,
    }));

    dispatch(
      list({
        ...prevState,
        sorting: order,
      })
    );
  };

  const onClickPage = (nextPage) => {
    setCurrentPage(nextPage);
    setOptions((prev) => ({
      ...prev,
      page: nextPage,
    }));
  };

  return (
    <BaseLayout>
      <HeaderSpacer></HeaderSpacer>
      <Wrapper>
        <HomePageContainer>
          <div className="aside_category_option">
            <Aside options={options} setOptions={setOptions}></Aside>
          </div>
          <ContentContainer>
            <NavBar>
              <div className="user_location">
                <span className="location_name">{location}</span>
                <img
                  classNmae="location_icon"
                  src="location.svg"
                  alt="location"
                ></img>
              </div>
              <div className="sort_orders">
                {sortOrders.map((order, i) => (
                  <span
                    className={sortOption === order ? "active" : ""}
                    key={i}
                    onClick={() => onClickSort(order)}
                  >{`${order}`}</span>
                ))}
              </div>
            </NavBar>
            <SmallCardList itemDatas={itemDatas}></SmallCardList>
            <hr></hr>
            <Pagination
              currentPage={currentPage}
              pageCount={10}
              limit={40}
              setCurrentPage={onClickPage}
            ></Pagination>
          </ContentContainer>
        </HomePageContainer>
      </Wrapper>
    </BaseLayout>
  );
};

export default HomePage;
