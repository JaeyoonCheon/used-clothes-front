import React from "react";
import styled from "styled-components";

import colors from "../lib/styles/colors";

import Header from "../components/common/Header";
import Aside from "../components/side/Aside";
import CardList from "../components/card/CardList";
import Pagenation from "../components/common/Pagenation";
import Footer from "../components/common/Footer";

const HomePageContainer = styled.div`
  display: flex;
  margin: 0 auto;
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
    font-family: "Noto Serif";
    font-weight: 100;
    font-size: 20px;
  }
  .sortorder {
    display: flex;

    span {
      color: ${colors.mono[0]};
      font-family: "Noto Serif";
      font-weight: 100;
      font-size: 14px;
    }
    span:nth-child(n + 2)::before {
      content: "|";
      margin: 0 1px 0 1px;
    }
  }
`;

const location = "산격동";

const sortOrder = ["최신 순", "가격 높은 순", "가격 낮은 순", "거리 순"];

const HomePage = () => {
  return (
    <>
      <Header></Header>
      <HeaderSpacer></HeaderSpacer>
      <HomePageContainer>
        <Aside></Aside>
        <ContentContainer>
          <NavBar>
            <span>{location}</span>
            <div className="sortorder">
              {sortOrder.map((order, i) => (
                <span key={i}>{`${order}`}</span>
              ))}
            </div>
          </NavBar>
          <CardList></CardList>
          <hr></hr>
          <Pagenation currentPage={27} pageCount={10} limit={40}></Pagenation>
        </ContentContainer>
      </HomePageContainer>
      <Footer></Footer>
    </>
  );
};

export default HomePage;
