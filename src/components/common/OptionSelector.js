import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch, batch } from "react-redux";

import useCategory from "../../hooks/useCategory";
import colors from "../../lib/styles/colors";
import { RadioOption } from "./RadioButton";
import Checkbox, { ColorCheckbox } from "../common/Checkbox";
import { changeSelected } from "../../slices/productSlice";
import useInput from "../../hooks/useInput";
import ExpandModal from "../modal/ExpandModal";
import { searchBrand, addBrand } from "../../slices/brandSlice";
import {
  searchPurchasePlace,
  addPurchasePlace,
} from "../../slices/purchasePlaceSlice";
import {
  toggleBrandModal,
  togglePurchasePlaceModal,
} from "../../slices/modalSlice";

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

  .more_items {
    display: inline-block;
    margin-top: 10px;

    cursor: pointer;
  }
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

const brandActions = {
  search: searchBrand,
  add: addBrand,
  toggleModal: toggleBrandModal,
};
const purchasePlaceActions = {
  search: searchPurchasePlace,
  add: addPurchasePlace,
  toggleModal: togglePurchasePlaceModal,
};

export const CheckboxSelector = (props) => {
  const dispatch = useDispatch();
  const { brands, colors, materials, conditions, purchase_places } =
    useSelector((state) => {
      return {
        brands: state.brand.list,
        colors: state.metadata.colors,
        materials: state.metadata.materials,
        conditions: state.metadata.conditions,
        purchase_places: state.purchase_place.list,
      };
    });
  const { isModalOpened } = useSelector((state) => {
    return { isModalOpened: state.modal.brand || state.modal.purchase_place };
  });

  useEffect(() => {
    if (isModalOpened) {
      return batch(() => {
        dispatch(toggleBrandModal(false));
        dispatch(togglePurchasePlaceModal(false));
      });
    }
  }, []);

  return (
    <CheckboxSelectorWrapper>
      <ExpandOption
        title="브랜드"
        name="brand"
        list={brands}
        actions={brandActions}
        canEdit={true}
      ></ExpandOption>
      <ColorOption title="색상" name="color" list={colors}></ColorOption>
      <CheckboxOption
        title="소재"
        name="material"
        list={materials}
      ></CheckboxOption>
      <CheckboxOption
        title="상품 상태"
        name="condition"
        list={conditions}
      ></CheckboxOption>
      <ExpandOption
        title="구입처"
        name="purchase_place"
        list={purchase_places}
        actions={purchasePlaceActions}
        canEdit={true}
      ></ExpandOption>
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
      changeSelected({
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

export const ExpandOption = (props) => {
  const { title, name, list, actions, canEdit } = props;
  const { toggleModal } = actions;
  const dispatch = useDispatch();

  const name_id = `${name}_id`;

  const { isModal } = useSelector((state) => {
    return { isModal: state.modal.purchase_place };
  });
  const { checkedOptions } = useSelector(({ product }) => {
    return { checkedOptions: product.selected[name_id] };
  });

  const checkedOptionsSet = new Set(checkedOptions);

  const toggleCheckbox = (option) => {
    if (checkedOptionsSet.has(option)) {
      checkedOptionsSet.delete(option);
    } else {
      checkedOptionsSet.add(option);
    }
    dispatch(
      changeSelected({
        name: name_id,
        value: Array.from(checkedOptionsSet),
      })
    );
  };

  const isChecked = (option) => {
    if (checkedOptionsSet.has(option[name_id])) {
      return true;
    } else {
      return false;
    }
  };

  const onClickModal = () => {
    dispatch(toggleModal(true));
  };

  return (
    <CheckboxWrapper>
      <OptionName>{title}</OptionName>
      <CheckboxList>
        {list.map((option) => {
          return (
            <Checkbox
              key={option[name_id]}
              data={option}
              isChecked={isChecked(option)}
              toggleCheckbox={() => toggleCheckbox(option[name_id])}
            ></Checkbox>
          );
        })}
      </CheckboxList>
      <span className="more_items" onClick={onClickModal}>
        더 보기
      </span>
      {isModal && <ExpandModal {...props}></ExpandModal>}
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
      changeSelected({
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
