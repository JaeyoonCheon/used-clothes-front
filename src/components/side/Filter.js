import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import colors from "../../lib/styles/colors";
import Checkbox, { ColorCheckbox } from "../common/Checkbox";
import { changeFilter } from "../../slices/productSlice";
import useInput from "../../hooks/useInput";
import { toggleBrandModal } from "../../slices/modalSlice";
import ExpandModal from "../modal/ExpandModal";

const FilterContainer = styled.div`
  width: 100%;
  background: white;

  padding: 10px 0;
  border-top: 2px solid ${colors.mono[1]};

  .filter_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    font-size: 18px;

    .foldingButton {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  }
  div[class$="modelCheckbox"] {
    margin: 5px;
  }
  .more_items {
    display: inline-block;
    margin-top: 10px;

    cursor: pointer;
  }
`;

const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColorCheckboxList = styled(CheckboxList)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
`;
const PriceForm = styled.form`
  display: flex;

  input {
    width: 20px;
  }
  button {
    background-color: white;
    color: black;
  }
`;

export const ModalCheckboxFilter = (props) => {
  const { title, name, list, actions } = props;
  const dispatch = useDispatch();

  const name_id = `${name}_id`;

  const [fold, setFold] = useState(false);
  const { isModal } = useSelector((state) => {
    return { isModal: state.modal[name] };
  });
  const partialList = list.slice(0, 10);

  const { checkedTypes } = useSelector(({ product }) => {
    return { checkedTypes: product.list.options.filter[name_id] };
  });

  const checkedTypesSet = new Set(checkedTypes);

  const toggleCheckbox = (option) => {
    if (checkedTypesSet.has(option)) {
      checkedTypesSet.delete(option);
    } else {
      checkedTypesSet.add(option);
    }
    dispatch(
      changeFilter({
        name: name_id,
        value: Array.from(checkedTypesSet),
      })
    );
  };

  const isChecked = (option) => {
    if (checkedTypesSet.has(option[name_id])) {
      return true;
    } else {
      return false;
    }
  };

  const onClickModal = () => {
    dispatch(actions.toggleModal(true));
  };

  return (
    <FilterContainer>
      <div className="filter_header">
        <div>{title}</div>
        {fold ? (
          <AiOutlineUp
            className="foldingButton"
            onClick={() => setFold(!fold)}
          ></AiOutlineUp>
        ) : (
          <AiOutlineDown
            className="foldingButton"
            onClick={() => setFold(!fold)}
          ></AiOutlineDown>
        )}
      </div>
      {fold && (
        <>
          <CheckboxList>
            {partialList.map((preOption) => (
              <Checkbox
                key={preOption[name_id]}
                data={preOption}
                isChecked={isChecked(preOption)}
                toggleCheckbox={() => toggleCheckbox(preOption[name_id])}
              ></Checkbox>
            ))}
          </CheckboxList>
          <span className="more_items" onClick={onClickModal}>
            더보기
          </span>
        </>
      )}
      {isModal && <ExpandModal {...props}></ExpandModal>}
    </FilterContainer>
  );
};

export const CheckboxFilter = (props) => {
  const { title, name, list } = props;
  const dispatch = useDispatch();

  const [fold, setFold] = useState(false);
  const { checkedTypes } = useSelector(({ product }) => {
    return { checkedTypes: product.list.options.filter[`${name}_code`] };
  });

  const checkedTypesSet = new Set(checkedTypes);

  const toggleCheckbox = (option) => {
    if (checkedTypesSet.has(option)) {
      checkedTypesSet.delete(option);
    } else {
      checkedTypesSet.add(option);
    }
    dispatch(
      changeFilter({
        name: `${name}_code`,
        value: Array.from(checkedTypesSet),
      })
    );
  };

  const isChecked = (option) => {
    if (checkedTypesSet.has(option.code)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <FilterContainer>
      <div className="filter_header">
        <div>{title}</div>
        {fold ? (
          <AiOutlineUp
            className="foldingButton"
            onClick={() => setFold(!fold)}
          ></AiOutlineUp>
        ) : (
          <AiOutlineDown
            className="foldingButton"
            onClick={() => setFold(!fold)}
          ></AiOutlineDown>
        )}
      </div>
      {fold && (
        <CheckboxList>
          {list.map((preOption) => (
            <Checkbox
              key={preOption.code}
              data={preOption}
              isChecked={isChecked(preOption)}
              toggleCheckbox={() => toggleCheckbox(preOption.code)}
            ></Checkbox>
          ))}
        </CheckboxList>
      )}
    </FilterContainer>
  );
};

export const ColorCheckboxFilter = (props) => {
  const { title, name, list } = props;
  const [fold, setFold] = useState(false);

  const dispatch = useDispatch();
  const { checkedTypes } = useSelector(({ product }) => {
    return { checkedTypes: product.list.options.filter.color_code };
  });

  const checkedTypesSet = new Set(checkedTypes);

  const toggleCheckbox = (option) => {
    if (checkedTypesSet.has(option)) {
      checkedTypesSet.delete(option);
    } else {
      checkedTypesSet.add(option);
    }
    dispatch(
      changeFilter({
        name: `${name}_code`,
        value: Array.from(checkedTypesSet),
      })
    );
  };

  const isChecked = (option) => {
    if (checkedTypesSet.has(option.code)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <FilterContainer>
      <div className="filter_header">
        <div>{title}</div>

        {fold ? (
          <AiOutlineUp
            className="foldingButton"
            onClick={() => setFold(!fold)}
          ></AiOutlineUp>
        ) : (
          <AiOutlineDown
            className="foldingButton"
            onClick={() => setFold(!fold)}
          ></AiOutlineDown>
        )}
      </div>
      {fold && (
        <ColorCheckboxList>
          {list.map((option) => (
            <ColorCheckbox
              key={option.code}
              color={option.code}
              name={option.name}
              isChecked={isChecked(option)}
              toggleCheckbox={() => toggleCheckbox(option.code)}
            ></ColorCheckbox>
          ))}
        </ColorCheckboxList>
      )}
    </FilterContainer>
  );
};

export const PriceFilter = (props) => {
  const { title, name } = props;
  const dispatch = useDispatch();

  const [fold, setFold] = useState(false);
  const [minValue, setMinValue] = useInput("");
  const [maxValue, setMaxValue] = useInput("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`Min: ${minValue} ~ Max: ${maxValue}`);
  };

  return (
    <FilterContainer>
      <div className="filter_header">
        <div>{title}</div>
        {fold ? (
          <AiOutlineUp
            className="foldingButton"
            onClick={() => setFold(!fold)}
          ></AiOutlineUp>
        ) : (
          <AiOutlineDown
            className="foldingButton"
            onClick={() => setFold(!fold)}
          ></AiOutlineDown>
        )}
      </div>
      {fold && (
        <PriceForm onSubmit={onSubmit}>
          <input
            type="text"
            name={name}
            id="min_price"
            value={minValue}
            onChange={setMinValue}
          ></input>
          <label htmlFor="min_price">원</label>
          <span>~</span>
          <input
            type="text"
            name={name}
            id="max_price"
            value={maxValue}
            onChange={setMaxValue}
          ></input>
          <label htmlFor="max_price">원</label>
          <button type="submit">검색</button>
        </PriceForm>
      )}
    </FilterContainer>
  );
};
