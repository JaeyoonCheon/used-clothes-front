import React from "react";
import styled from "styled-components";

import colors from "../lib/styles/colors";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Wrapper = styled.div`
  width: 1180px;
  margin: auto;
`;

const ContentWrapper = styled.div`
  width: auto;
  margin-bottom: 120px;
`;

const ContentTitle = styled.h2`
  margin-bottom: 50px;

  font-family: "Noto Serif";
  font-style: normal;
  font-weight: 300;
  font-size: 32px;
  line-height: 44px;
`;

const AddItemPage = () => {
  return (
    <>
      <Header></Header>
      <Wrapper>
        <ContentWrapper>
          <ContentTitle>사진 등록</ContentTitle>
        </ContentWrapper>
      </Wrapper>
      <Footer></Footer>
    </>
  );
};

export default AddItemPage;
