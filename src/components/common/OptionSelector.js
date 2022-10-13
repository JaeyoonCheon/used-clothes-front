import React, { useState } from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";
import { RadioOption } from "./RadioButton";

const SelectorWrapper = styled.div`
  width: fit-content;
  padding: 20px 30px 20px 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  border: 0.3px solid ${colors.mono[1]};
`;

const GroupsWrapper = styled.div`
  width: 850px;
  height: 300px;

  display: flex;
  justify-content: space-between;
`;

const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionGroupContainer = styled.fieldset`
  width: 200px;
  height: 260px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  border: 0.3px solid ${colors.mono[1]};
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const RadioOptionSelector = (props) => {
  const { categories, selectedId, onClick } = props;

  return (
    <OptionGroupContainer>
      {categories &&
        categories.map((category) => (
          <RadioOption
            key={category.id}
            id={category.id}
            selected={category.id === selectedId ? true : false}
            onClick={onClick}
          >
            {category.name}
          </RadioOption>
        ))}
    </OptionGroupContainer>
  );
};

export const CategorySelector = (props) => {
  const { categoryData } = props;

  const [large, setLarge] = useState(1);
  const [medium, setMedium] = useState(false);
  const [small, setSmall] = useState(false);

  console.log(`${large} ${medium} ${small}`);

  console.log(categoryData);

  const mediumCategoryData =
    large && categoryData.filter((category) => category.id === large)[0].child;

  console.log(mediumCategoryData);

  const smallCategoryData =
    medium &&
    mediumCategoryData.filter((category) => category.id === medium)[0].child;

  console.log(smallCategoryData);

  const onClickLarge = (id) => {
    setSmall(false);
    setMedium(false);
    setLarge(id);
  };
  const onClickMedium = (id) => {
    setSmall(false);
    setMedium(id);
  };
  const onClickSmall = (id) => {
    setSmall(id);
  };

  return (
    <SelectorWrapper>
      <GroupsWrapper>
        <GroupWrapper>
          <span>대분류</span>
          <RadioOptionSelector
            categories={categoryData}
            selected={large}
            onClick={onClickLarge}
          ></RadioOptionSelector>
        </GroupWrapper>
        <GroupWrapper>
          <span>중분류</span>
          <RadioOptionSelector
            categories={mediumCategoryData}
            selected={medium}
            onClick={onClickMedium}
          ></RadioOptionSelector>
        </GroupWrapper>
        <GroupWrapper>
          <span>소분류</span>
          <RadioOptionSelector
            categories={smallCategoryData}
            selected={small}
            onClick={onClickSmall}
          ></RadioOptionSelector>
        </GroupWrapper>
      </GroupsWrapper>
    </SelectorWrapper>
  );
};
