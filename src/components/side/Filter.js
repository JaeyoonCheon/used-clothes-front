import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import colors from "../../lib/styles/colors";
import Checkbox, { ColorCheckbox } from "../common/Checkbox";
import { changeArrayOption } from "../../slices/productSlice";
import useInput from "../../hooks/useInput";
import { toggleBrandModal } from "../../slices/modalSlice";
import BrandModal from "../modal/BrandModal";

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
  .more_brands {
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
  const { title, name, list } = props;
  const dispatch = useDispatch();

  const [fold, setFold] = useState(false);
  const [checkedTypes, setCheckedTypes] = useState(new Set());
  const { isModal } = useSelector((state) => {
    return { isModal: state.modal.brand };
  });
  const partialList = list.slice(0, 10);

  const toggleCheckbox = (option) => {
    const newCheckedTypes = new Set(checkedTypes);

    if (checkedTypes.has(option)) {
      newCheckedTypes.delete(option);
    } else {
      newCheckedTypes.add(option);
    }
    setCheckedTypes(newCheckedTypes);
  };
  const isChecked = (option) => {
    if (checkedTypes.has(option.brand_id)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    dispatch(
      changeArrayOption({
        name: `brand_id`,
        value: Array.from(checkedTypes),
      })
    );
  }, [checkedTypes]);

  const onClickModal = () => {
    dispatch(toggleBrandModal(true));
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
                key={preOption.brand_id}
                data={preOption}
                isChecked={isChecked(preOption)}
                toggleCheckbox={() => toggleCheckbox(preOption.brand_id)}
              ></Checkbox>
            ))}
          </CheckboxList>
          <span className="more_brands" onClick={onClickModal}>
            더보기
          </span>
        </>
      )}
      {isModal && (
        <BrandModal
          list={list}
          checkedTypes={checkedTypes}
          setCheckedTypes={setCheckedTypes}
        ></BrandModal>
      )}
    </FilterContainer>
  );
};

export const CheckboxFilter = (props) => {
  const { title, name, list } = props;
  const dispatch = useDispatch();

  const [fold, setFold] = useState(false);
  const [checkedTypes, setCheckedTypes] = useState(new Set());

  const toggleCheckbox = (option) => {
    const newCheckedTypes = new Set(checkedTypes);

    if (checkedTypes.has(option)) {
      newCheckedTypes.delete(option);
    } else {
      newCheckedTypes.add(option);
    }
    setCheckedTypes(newCheckedTypes);
  };

  const isChecked = (option) => {
    if (checkedTypes.has(option.code)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    dispatch(
      changeArrayOption({
        name: `${name}_code`,
        value: Array.from(checkedTypes),
      })
    );
  }, [checkedTypes]);

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

  const [checkedTypes, setCheckedTypes] = useState(new Set());

  const toggleCheckbox = (option) => {
    const newCheckedTypes = new Set(checkedTypes);

    if (checkedTypes.has(option)) {
      newCheckedTypes.delete(option);
    } else {
      newCheckedTypes.add(option);
    }
    setCheckedTypes(newCheckedTypes);
  };

  const isChecked = (option) => {
    if (checkedTypes.has(option.code)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    dispatch(
      changeArrayOption({
        name: `${name}_code`,
        value: Array.from(checkedTypes),
      })
    );
  }, [checkedTypes]);

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
