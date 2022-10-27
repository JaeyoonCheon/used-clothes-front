import React, { useState } from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";
import { RadioOption } from "./RadioButton";
import Checkbox from "../common/Checkbox";
import FilterModal from "../modal/FilterModal";
import { SquareButton } from "./Button";

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

  .CategoryTag {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const OptionGroupContainer = styled.fieldset`
  width: 200px;
  height: 260px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  margin: 0;
  padding: 0%;

  border: 0.3px solid ${colors.mono[1]};
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CheckboxSelectorWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const CheckboxList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OptionName = styled.div`
  width: 230px;

  font-weight: 300;
  font-size: 24px;
`;

export const RadioOptionSelector = (props) => {
  const { categories, selectedId, onClick } = props;

  console.log(selectedId);

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

  const mediumCategoryData =
    large && categoryData.filter((category) => category.id === large)[0].child;

  const smallCategoryData =
    medium &&
    mediumCategoryData.filter((category) => category.id === medium)[0].child;

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
          <span className="CategoryTag">대분류</span>
          <RadioOptionSelector
            categories={categoryData}
            selectedId={large}
            onClick={onClickLarge}
          ></RadioOptionSelector>
        </GroupWrapper>
        <GroupWrapper>
          <span className="CategoryTag">중분류</span>
          <RadioOptionSelector
            categories={mediumCategoryData}
            selectedId={medium}
            onClick={onClickMedium}
          ></RadioOptionSelector>
        </GroupWrapper>
        <GroupWrapper>
          <span className="CategoryTag">소분류</span>
          <RadioOptionSelector
            categories={smallCategoryData}
            selectedId={small}
            onClick={onClickSmall}
          ></RadioOptionSelector>
        </GroupWrapper>
      </GroupsWrapper>
    </SelectorWrapper>
  );
};

export const CheckboxSelector = (props) => {
  const { filteringData } = props;

  const [modalState, setModalState] = useState({ index: -1 });

  return (
    <CheckboxSelectorWrapper>
      {filteringData.map((data, idx) => {
        return (
          <CheckboxOption
            key={idx}
            idx={idx}
            filteringData={data}
            modalState={modalState}
            setModalState={setModalState}
          ></CheckboxOption>
        );
      })}
    </CheckboxSelectorWrapper>
  );
};

export const CheckboxOption = (props) => {
  const { idx, filteringData, modalState, setModalState } = props;
  const { name, types } = filteringData;
  const preOptions = [...types].splice(0, 4);

  const [currentPos, setCurrentPos] = useState([]);
  const [checkedOptions, setCheckedOptions] = useState(new Set());

  const toggleCheckbox = (option) => {
    if (checkedOptions.has(option)) {
      const newCheckedOptions = new Set(checkedOptions);
      newCheckedOptions.delete(option);
      setCheckedOptions(newCheckedOptions);
    } else {
      const newCheckedOptions = new Set(checkedOptions);
      newCheckedOptions.add(option);
      setCheckedOptions(newCheckedOptions);
    }
  };

  return (
    <CheckboxWrapper>
      <OptionName>{name}</OptionName>
      <CheckboxList>
        {preOptions.map((preOption, idx) => (
          <Checkbox
            key={idx}
            checkboxLabel={preOption}
            checkedOptions={checkedOptions}
            toggleCheckbox={toggleCheckbox}
          ></Checkbox>
        ))}
      </CheckboxList>
      <SquareButton
        onClick={(e) => {
          const pos = [e.pageX, e.pageY];
          setCurrentPos(pos);
          setModalState({ ...modalState, index: idx });
        }}
      ></SquareButton>
      {modalState.index === idx && (
        <FilterModal
          options={types}
          position={currentPos}
          setModalState={setModalState}
          checkedOptions={checkedOptions}
          toggleCheckbox={toggleCheckbox}
        ></FilterModal>
      )}
    </CheckboxWrapper>
  );
};
