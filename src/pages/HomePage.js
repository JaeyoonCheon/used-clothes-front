import React from "react";
import styled from "styled-components";

import Header from "../components/common/Header";
import Category from "../components/side/Category";
import CardList from "../components/card/CardList";

const HomePageContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 1180px;
  align-items: center;
`;

const HomePage = () => {
  return (
    <>
      <Header></Header>
      <HomePageContainer>
        <Category></Category>
        <CardList></CardList>
      </HomePageContainer>
    </>
  );
};

export default HomePage;
