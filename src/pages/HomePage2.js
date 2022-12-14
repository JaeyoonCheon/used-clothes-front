import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import colors from "../lib/styles/colors";
import BaseLayout from "../components/layout/BaseLayout";
import Aside from "../components/side/Aside";
import { LargeCardList } from "../components/card/CardList";
import Pagination from "../components/common/Pagination";
import { listProductAPI, testListProductsAPI } from "../lib/api/product";
import { listProduct } from "../slices/productSlice";
import OptionTable from "../components/common/OptionTable";
import { itemDatas } from "../lib/dummydata/dummydata";

const Wrapper = styled.div``;

const HomePageContainer = styled.div`
  display: flex;
  margin: 0 auto;
  margin-bottom: 300px;
  width: 1180px;

  aside {
    margin-left: auto;
  }
`;

const HeaderSpacer = styled.div`
  height: 60px;
`;

const ContentContainer = styled.div`
  width: 100%;
  margin-right: auto;

  .aside {
    margin-bottom: 40px;
  }
`;

const NavBar = styled.div`
  height: 40px;

  .location {
    font-weight: 100;
    font-size: 20px;
  }
  .sortorders {
    display: flex;
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

const HomePage2 = () => {
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
    listProductAPI(options).then((result) => {
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
      listProduct({
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
          <ContentContainer>
            <div className="aside">
              <NavBar>
                <div>
                  <span>{location}</span>
                  <img src="location.svg" alt="location"></img>
                </div>
                <div className="sortorders">
                  {sortOrders.map((order, i) => (
                    <span
                      className={sortOption === order ? "active" : ""}
                      key={i}
                      onClick={() => onClickSort(order)}
                    >{`${order}`}</span>
                  ))}
                </div>
              </NavBar>
              <OptionTable></OptionTable>
            </div>
            <LargeCardList itemDatas={itemDatas}></LargeCardList>
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

export default HomePage2;
