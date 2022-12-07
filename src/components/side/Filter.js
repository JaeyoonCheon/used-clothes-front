import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { useDispatch } from "react-redux";

import colors from "../../lib/styles/colors";
import Checkbox, { ColorCheckbox } from "../common/Checkbox";
import { changeArrayOption } from "../../slices/productSlice";

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

    font-size: 20px;

    .filterModalButton {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  }
  div[class$="modelCheckbox"] {
    margin: 5px;
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

export const CheckboxFilter = (props) => {
  const { title, name, list, modalState, setModalState } = props;
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
  const { title, name, list, modalState, setModalState } = props;

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
      </div>
      <ColorCheckboxList>
        {list.map((preOption) => (
          <ColorCheckbox
            key={preOption.code}
            color={preOption.code}
            name={preOption.name}
            isChecked={isChecked(preOption)}
            toggleCheckbox={() => toggleCheckbox(preOption.code)}
          ></ColorCheckbox>
        ))}
      </ColorCheckboxList>
    </FilterContainer>
  );
};
