import React, { useEffect, useState } from "react";
import styled from "styled-components";

import useCategory from "../../hooks/useCategory";
import colors from "../../lib/styles/colors";
import { RadioOption } from "./RadioButton";
import Checkbox, { ColorCheckbox } from "../common/Checkbox";
import FilterModal from "../modal/FilterModal";
import { SmallButton } from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { changeArrayProduct } from "../../slices/productSlice";
import { toggleBrandModal } from "../../slices/modalSlice";
import useInput from "../../hooks/useInput";
import BrandModal from "../modal/BrandModal";

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
  margin-bottom: 30px;
`;

const CheckboxList = styled.div`
  display: flex;
  align-items: center;

  flex-wrap: wrap;
`;

const OptionName = styled.div`
  width: 230px;
  margin-bottom: 30px;

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

export const CategorySelector = ({
  onChange,
  initValue = { mainCategory: 1, subCategory: null },
}) => {
  const { main, sub } = useCategory();

  const [mainCategory, setMainCategory] = useState(initValue.mainCategory);
  const [subCategory, setSubCategory] = useState(initValue.subCategory);

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
  const { onChange, initValue = {} } = props;

  const { brands, colors, materials, conditions } = useSelector((state) => {
    return {
      brands: state.brand.list,
      colors: state.metadata.colors,
      materials: state.metadata.materials,
      conditions: state.metadata.conditions,
    };
  });

  return (
    <CheckboxSelectorWrapper>
      <BrandOption
        title="브랜드"
        name="brand"
        list={brands}
        initValue={initValue.brand_id}
        canEdit={true}
      ></BrandOption>
      <ColorOption
        title="색상"
        name="color"
        list={colors}
        initValue={initValue.color_code}
      ></ColorOption>
      <CheckboxOption
        title="소재"
        name="material"
        list={materials}
        initValue={initValue.material_code}
      ></CheckboxOption>
      <CheckboxOption
        title="상품 상태"
        name="condition"
        list={conditions}
        initValue={initValue.condition_code}
      ></CheckboxOption>
    </CheckboxSelectorWrapper>
  );
};

export const CheckboxOption = (props) => {
  const { title, name, list, initValue = [] } = props;
  const dispatch = useDispatch();

  const [checkedOptions, setCheckedOptions] = useState(new Set(initValue));

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
        {list.map((option) => {
          return (
            <Checkbox
              key={option.code}
              data={option}
              isChecked={isChecked(option)}
              toggleCheckbox={() => toggleCheckbox(option)}
            ></Checkbox>
          );
        })}
      </CheckboxList>
    </CheckboxWrapper>
  );
};

export const BrandOption = (props) => {
  const { title, name, list, initValue = [], canEdit } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useInput("");

  const [checkedOptions, setCheckedOptions] = useState(new Set(initValue));
  const { isModal } = useSelector((state) => {
    return { isModal: state.modal.brand };
  });

  const toggleCheckbox = (option) => {
    const newCheckedOptions = new Set(checkedOptions);
    if (checkedOptions.has(option.brand_id)) {
      newCheckedOptions.delete(option.brand_id);
    } else {
      newCheckedOptions.add(option.brand_id);
    }
    setCheckedOptions(newCheckedOptions);
  };

  useEffect(() => {
    dispatch(
      changeArrayProduct({
        name: `brand_id`,
        value: Array.from(checkedOptions),
      })
    );
  }, [checkedOptions]);

  const isChecked = (option) => {
    if (checkedOptions.has(option.brand_id)) {
      return true;
    } else {
      return false;
    }
  };

  const onClickModal = () => {
    dispatch(toggleBrandModal(true));
  };

  return (
    <CheckboxWrapper>
      <OptionName>{title}</OptionName>
      <CheckboxList>
        {list.map((option) => {
          return (
            <Checkbox
              key={option.code}
              data={option}
              isChecked={isChecked(option)}
              toggleCheckbox={() => toggleCheckbox(option)}
            ></Checkbox>
          );
        })}
      </CheckboxList>
      <span onClick={onClickModal}>더 보기</span>
      {isModal && (
        <BrandModal
          list={list}
          checkedTypes={checkedOptions}
          setCheckedTypes={setCheckedOptions}
          canEdit={canEdit}
        ></BrandModal>
      )}
    </CheckboxWrapper>
  );
};

export const ColorOption = (props) => {
  const { title, name, list, initValue = [] } = props;
  const dispatch = useDispatch();

  const [checkedOptions, setCheckedOptions] = useState(new Set(initValue));

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

  console.log(list);

  return (
    <CheckboxWrapper>
      <OptionName>{title}</OptionName>
      <CheckboxList>
        {list.map((option) => {
          return (
            <ColorCheckbox
              key={option.code}
              color={option.code}
              name={option.name}
              isChecked={isChecked(option)}
              toggleCheckbox={() => toggleCheckbox(option)}
            ></ColorCheckbox>
          );
        })}
      </CheckboxList>
    </CheckboxWrapper>
  );
};
