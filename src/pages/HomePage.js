import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import colors from "../lib/styles/colors";
import BaseLayout from "../components/layout/BaseLayout";
import Aside from "../components/side/Aside";
import { SmallCardList } from "../components/card/CardList";
import Pagination from "../components/common/Pagination";
import { list, changeOption } from "../slices/productSlice";
import { getCategory } from "../slices/categorySlice";
import { getMetadata } from "../slices/metadataSlice";

import { useDispatch, useSelector } from "react-redux";

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
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { filter: productOptions } = useSelector((state) => {
    const list = state.product.list;

    return {
      filter: list.options.filter,
      sort_by: list.sort_by,
      order: list.order,
      elements: list.elements,
      page: list.page,
    };
  });

  const { productList } = useSelector(({ product }) => ({
    productList: product.list.productList,
  }));

  useEffect(() => {
    console.log("Fetch new options");
    dispatch(getCategory());
    dispatch(getMetadata("colors"));
    dispatch(list(productOptions));
  }, []);

  const onClickSort = (order) => {
    dispatch(
      changeOption({
        name: "sorting",
        value: order,
      })
    );
    dispatch(list(productOptions));
  };

  const onClickOption = (typeCode, option) => {
    dispatch(
      changeOption({
        name: typeCode,
        value: option,
      })
    );
  };

  const onClickPage = (nextPage) => {
    setCurrentPage(nextPage);
    onClickOption((prev) => ({
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
            <Aside
              options={productOptions}
              onClickOption={onClickOption}
            ></Aside>
          </div>
          <ContentContainer>
            <NavBar>
              <div className="user_location">
                <span className="location_name">{location}</span>
                <img
                  className="location_icon"
                  src="location.svg"
                  alt="location"
                ></img>
              </div>
              <div className="sort_orders">
                {sortOrders.map((order, i) => (
                  <span
                    className={productOptions.sorting === order ? "active" : ""}
                    key={i}
                    onClick={() => onClickSort(order)}
                  >{`${order}`}</span>
                ))}
              </div>
            </NavBar>
            <SmallCardList itemDatas={productList}></SmallCardList>
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
