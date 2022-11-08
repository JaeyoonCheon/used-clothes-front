import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import colors from "../lib/styles/colors";
import BaseLayout from "../components/layout/BaseLayout";
import Aside from "../components/side/Aside";
import CardList from "../components/card/CardList";
import Pagination from "../components/common/Pagination";
import { listProductsAPI } from "../lib/api/product";

import { itemDatas } from "../lib/dummydata/dummydata";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1180px 1fr;

  aside {
    margin-left: auto;
  }
`;

const HomePageContainer = styled.div`
  display: flex;
  margin: 0;
  margin-bottom: 300px;
  width: 100%;
`;

const HeaderSpacer = styled.div`
  height: 60px;
`;

const ContentContainer = styled.div`
  width: 1180px;
  margin-right: auto;
`;

const NavBar = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  .location {
    font-weight: 100;
    font-size: 20px;
  }
  .sortorders {
    display: flex;

    span {
      color: ${colors.mono[0]};
      font-weight: 100;
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

  console.log(options);

  useEffect(() => {
    const fetchResult = listProductsAPI(options);

    setProducts(fetchResult);
  }, [options]);

  const onClickSort = (order) => {
    setSortOption(order);
    setOptions((prev) => ({
      ...prev,
      sorting: order,
    }));
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
        <aside>
          <Aside options={options} setOptions={setOptions}></Aside>
        </aside>
        <HomePageContainer>
          <ContentContainer>
            <NavBar>
              <span>{location}</span>
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
            <CardList itemDatas={itemDatas}></CardList>
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
