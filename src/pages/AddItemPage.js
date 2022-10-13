import React from "react";
import styled from "styled-components";

import colors from "../lib/styles/colors";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Input, LimitedInput } from "../components/common/Input";
import { CategorySelector } from "../components/common/OptionSelector";
import { categoryData } from "../lib/dummydata/dummydata";

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
        <ContentWrapper>
          <ContentTitle>제목</ContentTitle>
          <LimitedInput
            placeholder="제목을 입력해주세요."
            isRequired={true}
            limit={60}
          ></LimitedInput>
        </ContentWrapper>
        <ContentWrapper>
          <ContentTitle>카테고리</ContentTitle>
          <CategorySelector categoryData={categoryData}></CategorySelector>
        </ContentWrapper>
        <ContentWrapper>
          <ContentTitle>옵션</ContentTitle>
          <Input></Input>
        </ContentWrapper>
        <ContentWrapper>
          <ContentTitle>가격</ContentTitle>
          <Input></Input>
        </ContentWrapper>
        <ContentWrapper>
          <ContentTitle>게시글 내용</ContentTitle>
          <Input></Input>
        </ContentWrapper>
      </Wrapper>
      <Footer></Footer>
    </>
  );
};

export default AddItemPage;
