import React, { useEffect, useState } from "react";
import styled from "styled-components";

import useCategory from "../../hooks/useCategory";
import colors from "../../lib/styles/colors";
import { RadioOption } from "./RadioButton";
import Checkbox from "../common/Checkbox";
import FilterModal from "../modal/FilterModal";
import { SmallButton } from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { changeArrayProduct } from "../../slices/productSlice";

const SelectorWrapper = styled.div`
  width: fit-content;
  padding: 20px 30px 20px 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  border: 0.3px solid ${colors.mono[1]};
`;

const GroupsWrapper = styled.div`
  width: 450px;
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
  const { name, categories, selectedId, onClick } = props;

  return (
    <OptionGroupContainer>
      {categories &&
        categories.map((category) => (
          <RadioOption
            key={category[`${name}_id`]}
            id={category[`${name}_id`]}
            selected={category[`${name}_id`] === selectedId ? true : false}
            onClick={onClick}
          >
            {category[`${name}_name`]}
          </RadioOption>
        ))}
    </OptionGroupContainer>
  );
};

export const CategorySelector = ({ onChange }) => {
  const { main, sub } = useCategory();

  const [mainCategory, setMainCategory] = useState(1);
  const [subCategory, setSubCategory] = useState(null);

  useEffect(() => {
    onChange("main_category_id", mainCategory);
  }, []);

  const subList =
    mainCategory &&
    sub.filter((category) => category.main_category_id === mainCategory);

  const onClickMainCategory = (id) => {
    setSubCategory(null);
    setMainCategory(id);
    onChange("main_category_id", id);
    onChange("sub_category_id", null);
  };
  const onClickSubCategory = (id) => {
    setSubCategory(id);
    onChange("sub_category_id", id);
  };

  return (
    <SelectorWrapper>
      <GroupsWrapper>
        <GroupWrapper>
          <span className="CategoryTag">대분류</span>
          <RadioOptionSelector
            name="main_category"
            categories={main}
            selectedId={mainCategory}
            onClick={onClickMainCategory}
          ></RadioOptionSelector>
        </GroupWrapper>
        <GroupWrapper>
          <span className="CategoryTag">소분류</span>
          <RadioOptionSelector
            name="sub_category"
            categories={subList}
            selectedId={subCategory}
            onClick={onClickSubCategory}
          ></RadioOptionSelector>
        </GroupWrapper>
      </GroupsWrapper>
    </SelectorWrapper>
  );
};

export const CheckboxSelector = (props) => {
  const [modalState, setModalState] = useState({ index: -1 });

  const { colors, materials, conditions } = useSelector((state) => {
    return {
      colors: state.metadata.colors,
      materials: state.metadata.materials,
      conditions: state.metadata.conditions,
    };
  });

  return (
    <CheckboxSelectorWrapper>
      <CheckboxOption
        title="색상"
        name="color"
        list={colors}
        modalState={modalState}
        setModalState={setModalState}
      ></CheckboxOption>
      <CheckboxOption
        title="소재"
        name="material"
        list={materials}
        modalState={modalState}
        setModalState={setModalState}
      ></CheckboxOption>
      <CheckboxOption
        title="상품 상태"
        name="condition"
        list={conditions}
        modalState={modalState}
        setModalState={setModalState}
      ></CheckboxOption>
    </CheckboxSelectorWrapper>
  );
};

export const CheckboxOption = (props) => {
  const { title, name, list, modalState, setModalState } = props;
  const dispatch = useDispatch();

  const preOptions = [...list].splice(0, 4);

  const [currentPos, setCurrentPos] = useState([]);
  const [checkedOptions, setCheckedOptions] = useState(new Set());

  const toggleCheckbox = (option) => {
    const newCheckedOptions = new Set(checkedOptions);
    if (checkedOptions.has(option.code)) {
      newCheckedOptions.delete(option.code);
    } else {
      newCheckedOptions.add(option.code);
    }
    setCheckedOptions(newCheckedOptions);
  };

  useEffect(() => {
    dispatch(
      changeArrayProduct({
        name: `${name}_code`,
        value: Array.from(checkedOptions),
      })
    );
  }, [checkedOptions]);

  const isChecked = (option) => {
    if (checkedOptions.has(option.code)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <CheckboxWrapper>
      <OptionName>{title}</OptionName>
      <CheckboxList>
        {preOptions.map((preOption) => {
          return (
            <Checkbox
              key={preOption.code}
              data={preOption}
              isChecked={isChecked(preOption)}
              toggleCheckbox={() => toggleCheckbox(preOption)}
            ></Checkbox>
          );
        })}
      </CheckboxList>
      <SmallButton
        isFilled={false}
        colorTheme={colors.mono[0]}
        fontColor={colors.mono[0]}
        onClick={(e) => {
          const pos = [e.pageX, e.pageY];
          setCurrentPos(pos);
          setModalState({ ...modalState, index: name });
        }}
      >
        더 보기
      </SmallButton>
      {modalState.index === name && (
        <FilterModal
          options={list}
          position={currentPos}
          setModalState={setModalState}
          checkedOptions={checkedOptions}
          toggleCheckbox={toggleCheckbox}
        ></FilterModal>
      )}
    </CheckboxWrapper>
  );
};
