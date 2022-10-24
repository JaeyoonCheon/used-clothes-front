import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import colors from "../lib/styles/colors";

import Header from "../components/common/Header";
import Aside from "../components/side/Aside";
import CardList from "../components/card/CardList";
import Pagination from "../components/common/Pagination";
import Footer from "../components/common/Footer";

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
    condition: "",
    deliveryFee: 0,
    brandId: [],
    purchasePlaceId: [],
    color: "",
    material: [],
  });

  return (
    <>
      <Header></Header>
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
                  onClick={() => setSortOption(order)}
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
            setCurrentPage={setCurrentPage}
          ></Pagination>
        </ContentContainer>
      </HomePageContainer>
      <Footer></Footer>
    </>
  );
};

export default HomePage;
