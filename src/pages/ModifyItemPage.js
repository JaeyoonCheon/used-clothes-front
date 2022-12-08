import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
import {
  loadProduct,
  modifyProduct,
  changeArrayOption,
  changeProduct,
} from "../slices/productSlice";
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
const ModifyItemPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id: productId } = params;
  const { product, newProduct } = useSelector((state) => {
    return {
      product: state.product.detail.currentProduct,
      newProduct: state.product.selected.product,
    };
  });

  const [isShipping, setIsShipping] = useState(
    product.shipping_fee ? true : false
  );

  console.log(product);

  const onChange = (name, value) => {
    dispatch(changeProduct({ name, value }));
  };
  const onPressRadio = (e) => {
    if (e.target.value === "include") {
      dispatch(changeProduct(e.target.name, null));
      setIsShipping(false);
    } else {
      setIsShipping(true);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(modifyProduct(newProduct));
    navigate("/mypage");
  };

  console.log(product.price);

  useEffect(() => {
    dispatch(loadProduct());
  }, []);

  return (
    <BaseLayout>
      <Wrapper onSubmit={onSubmit}>
        <ContentWrapper>
          <ContentTitle>사진 등록</ContentTitle>
          <ImageUploader></ImageUploader>
        </ContentWrapper>
        <ContentWrapper>
          <ContentTitle>제목</ContentTitle>
          <LimitedInput
            placeholder="제목을 입력해주세요."
            name="name"
            isRequired={true}
            limit={60}
            onChange={onChange}
            initValue={product.name}
          ></LimitedInput>
        </ContentWrapper>
        <ContentWrapper>
          <ContentTitle>카테고리</ContentTitle>
          <CategorySelector
            onChange={onChange}
            initValue={{
              mainCategory: product.main_category_id,
              subCategory: product.sub_category_id,
            }}
          ></CategorySelector>
        </ContentWrapper>
        <ContentWrapper>
          <ContentTitle>옵션</ContentTitle>
          <CheckboxSelector
            onChange={onChange}
            initValue={{
              color_code: product.color_code,
              material_code: product.material_code,
              condition_code: product.condition_code,
            }}
          ></CheckboxSelector>
        </ContentWrapper>
        <ContentWrapper>
          <ContentRowWrapper>
            <div className="priceTitle">
              <ContentTitle>가격</ContentTitle>
            </div>
            <Input
              width={`300px`}
              name="price"
              onChange={onChange}
              initValue={product.price}
            >
              원
            </Input>
          </ContentRowWrapper>
          <ContentRowWrapper>
            <div className="priceTitle">배송비</div>
            <RadioGroup>
              <RadioButton
                name="confirmType"
                value="include"
                width="80px"
                defaultChecked
                onClick={onPressRadio}
              >
                포함
              </RadioButton>
              <RadioButton
                name="confirmType"
                value="exclude"
                width="80px"
                onClick={onPressRadio}
              >
                별도
              </RadioButton>
            </RadioGroup>
            {isShipping && (
              <Input
                width={`128px`}
                name="shipping_fee"
                onChange={onChange}
                initValue={product.shipping_fee}
              >
                원
              </Input>
            )}
          </ContentRowWrapper>
        </ContentWrapper>
        <ContentWrapper>
          <ContentTitle>게시글 내용</ContentTitle>
          <LimitedTextarea
            placeholder="상품을 설명할 수 있는 내용을 입력해주세요."
            name="description"
            isRequired={true}
            limit={2000}
            onChange={onChange}
            initValue={product.descriptions}
          ></LimitedTextarea>
        </ContentWrapper>
        <ContentWrapper>
          <ConfirmButtonWrapper>
            <MiddleButton isFilled={true} colorTheme={colors.mono[0]}>
              취소하기
            </MiddleButton>
            <MiddleButton
              type="submit"
              isFilled={true}
              colorTheme={colors.blue[0]}
            >
              수정하기
            </MiddleButton>
          </ConfirmButtonWrapper>
        </ContentWrapper>
      </Wrapper>
    </BaseLayout>
  );
};

export default ModifyItemPage;
