import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import colors from "../lib/styles/colors";
import BaseLayout from "../components/layout/BaseLayout";
import { MiddleButton } from "../components/common/Button";
import {
  NonLabelInput,
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
import { addProduct, changeSelected } from "../slices/productSlice";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.form`
  width: 1180px;
  margin: auto;
  padding: 50px 0;
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
  const [isShipping, setIsShipping] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selected } = useSelector((state) => {
    return {
      selected: state.product.selected,
    };
  });

  const onChange = (name, value) => {
    dispatch(changeSelected({ name, value }));
  };

  const onPressRadio = (e) => {
    if (e.target.value === "include") {
      dispatch(changeSelected(e.target.name, null));
      setIsShipping(false);
    } else {
      setIsShipping(true);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(selected));
    navigate("/mypage");
  };

  return (
    <BaseLayout>
      <Wrapper onSubmit={onSubmit}>
        <ContentWrapper>
          <ContentTitle>?????? ??????</ContentTitle>
          <ImageUploader></ImageUploader>
        </ContentWrapper>
        <ContentWrapper>
          <ContentTitle>??????</ContentTitle>
          <LimitedInput
            placeholder="????????? ??????????????????."
            name="name"
            isRequired={true}
            limit={60}
            onChange={onChange}
          ></LimitedInput>
        </ContentWrapper>
        <ContentWrapper>
          <ContentTitle>????????????</ContentTitle>
          <CategorySelector onChange={onChange}></CategorySelector>
        </ContentWrapper>
        <ContentWrapper>
          <ContentTitle>??????</ContentTitle>
          <CheckboxSelector onChange={onChange}></CheckboxSelector>
        </ContentWrapper>
        <ContentWrapper>
          <ContentRowWrapper>
            <div className="priceTitle">
              <ContentTitle>??????</ContentTitle>
            </div>
            <NonLabelInput
              width={`300px`}
              name="price"
              onChange={onChange}
            ></NonLabelInput>
          </ContentRowWrapper>
          <ContentRowWrapper>
            <div className="priceTitle">?????????</div>
            <RadioGroup>
              <RadioButton
                name="confirmType"
                value="include"
                width="80px"
                defaultChecked
                onClick={onPressRadio}
              >
                ??????
              </RadioButton>
              <RadioButton
                name="confirmType"
                value="exclude"
                width="80px"
                onClick={onPressRadio}
              >
                ??????
              </RadioButton>
            </RadioGroup>
            {isShipping && (
              <NonLabelInput
                width={`128px`}
                name="shipping_fee"
                onChange={onChange}
              >
                ???
              </NonLabelInput>
            )}
          </ContentRowWrapper>
        </ContentWrapper>
        <ContentWrapper>
          <ContentTitle>????????? ??????</ContentTitle>
          <LimitedTextarea
            placeholder="????????? ????????? ??? ?????? ????????? ??????????????????."
            name="description"
            isRequired={true}
            limit={2000}
            onChange={onChange}
          ></LimitedTextarea>
        </ContentWrapper>
        <ContentWrapper>
          <ConfirmButtonWrapper>
            <MiddleButton isFilled={true} colorTheme={colors.mono[0]}>
              ????????????
            </MiddleButton>
            <MiddleButton
              type="submit"
              isFilled={true}
              colorTheme={colors.blue[0]}
            >
              ????????????
            </MiddleButton>
          </ConfirmButtonWrapper>
        </ContentWrapper>
      </Wrapper>
    </BaseLayout>
  );
};

export default AddItemPage;
