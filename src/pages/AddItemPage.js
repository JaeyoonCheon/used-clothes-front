import React from "react";
import styled from "styled-components";

import colors from "../lib/styles/colors";
import BaseLayout from "../components/layout/BaseLayout";
import { MiddleButton } from "../components/common/Button";
import {
  Input,
  LimitedInput,
  LimitedTextarea,
} from "../components/common/Input";
import {
  CategorySelector,
  CheckboxSelector,
} from "../components/common/OptionSelector";
import { categoryData, filterDatas } from "../lib/dummydata/dummydata";
import { RadioGroup, RadioButton } from "../components/common/RadioButton";
import ImageUploader from "../components/common/ImageUploader";

const Wrapper = styled.div`
  width: 1180px;
  margin: auto;
`;

const ContentWrapper = styled.div`
  width: auto;
  margin-bottom: 120px;
`;

const ContentRowWrapper = styled.div`
  width: 700px;
  display: flex;
  align-items: baseline;

  .priceTitle {
    width: 100px;
    color: ${colors.mono[0]};
  }
  .input {
    display: flex;
    align-items: center;
  }
`;

const ContentTitle = styled.h2`
  font-style: normal;
  font-weight: 300;
  font-size: 32px;
  line-height: 44px;
`;

const ConfirmButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: 40px;
  }
`;

const AddItemPage = () => {
  return (
    <BaseLayout>
      <Wrapper>
        <ContentWrapper>
          <ContentTitle>사진 등록</ContentTitle>
          <ImageUploader></ImageUploader>
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
          <CheckboxSelector filteringData={filterDatas}></CheckboxSelector>
        </ContentWrapper>
        <ContentWrapper>
          <ContentRowWrapper>
            <div className="priceTitle">
              <ContentTitle>가격</ContentTitle>
            </div>
            <Input width={`300px`}>원</Input>
          </ContentRowWrapper>
          <ContentRowWrapper>
            <div className="priceTitle">배송비</div>
            <RadioGroup>
              <RadioButton
                name="confirmType"
                value="include"
                width="80px"
                defaultChecked
              >
                포함
              </RadioButton>
              <RadioButton name="confirmType" value="exclude" width="80px">
                별도
              </RadioButton>
            </RadioGroup>
            <Input width={`128px`}>원</Input>
          </ContentRowWrapper>
        </ContentWrapper>
        <ContentWrapper>
          <ContentTitle>게시글 내용</ContentTitle>
          <LimitedTextarea
            placeholder="상품을 설명할 수 있는 내용을 입력해주세요."
            isRequired={true}
            limit={2000}
          ></LimitedTextarea>
        </ContentWrapper>
        <ContentWrapper>
          <ConfirmButtonWrapper>
            <MiddleButton backgroundColor={colors.mono[0]}>
              취소하기
            </MiddleButton>
            <MiddleButton backgroundColor={colors.blue[0]}>
              등록하기
            </MiddleButton>
          </ConfirmButtonWrapper>
        </ContentWrapper>
      </Wrapper>
    </BaseLayout>
  );
};

export default AddItemPage;
