import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios, { Axios } from "axios";
import qs from "qs";

import colors from "../lib/styles/colors";

import BaseLayout from "../components/layout/BaseLayout";
import Aside from "../components/side/Aside";
import CardList from "../components/card/CardList";
import Pagination from "../components/common/Pagination";

import { itemDatas } from "../lib/dummydata/dummydata";

const HomePageContainer = styled.div`
  display: flex;
  margin: 0 auto;
  margin-bottom: 300px;
  width: 1180px;
`;

const HeaderSpacer = styled.div`
  height: 60px;
`;

const ContentContainer = styled.div`
  width: 980px;
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
  const [options, setOptions] = useState({
    minPrice: 0,
    maxPrice: Infinity,
    condition: [],
    deliveryFee: 0,
    brand: [],
    purchasePlaceId: [],
    color_code: [],
    material: [],
    sorting: sortOption,
    page: currentPage,
  });

  const [products, setProducts] = useState([]);

  console.log(options);

  useEffect(() => {
    const query = qs.stringify(options, { delimiter: "," });
    console.log(`Ready to fetching!`);

    async function fetchProducts() {
      try {
        console.log("fetch Start");
        const response = await axios.get(
          `http://118.67.142.10/clothe/list?filters=${query}`
        );
        console.log(`fetch success!`);
        setProducts(response);
      } catch (e) {
        console.log(`fetch products Error!`);
        console.log(e);
      }
    }

    fetchProducts();
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
      <HomePageContainer>
        <Aside options={options} setOptions={setOptions}></Aside>
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
    </BaseLayout>
  );
};

export default HomePage;
