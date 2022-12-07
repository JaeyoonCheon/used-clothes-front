import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsPlusSquare } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import colors from "../../lib/styles/colors";
import Checkbox from "../common/Checkbox";
import Portal from "../../lib/portal";
import FilterModal from "../modal/FilterModal";
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
  justify-content: space-between;
`;

export const CheckboxFilter = (props) => {
  const { title, name, list, onClickOption, modalState, setModalState } = props;

  const dispatch = useDispatch();

  const preOptions = [...list].splice(0, 4);

  const [currentPos, setCurrentPos] = useState([]);
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
        <BsPlusSquare
          className="filterModalButton"
          onClick={(e) => {
            const pos = [e.pageX, e.pageY];
            setCurrentPos(pos);
            setModalState({ ...modalState, index: name });
          }}
        ></BsPlusSquare>
      </div>
      <CheckboxList>
        {preOptions.map((preOption) => (
          <Checkbox
            key={preOption.code}
            data={preOption}
            isChecked={isChecked(preOption)}
            toggleCheckbox={() => toggleCheckbox(preOption.code)}
          ></Checkbox>
        ))}
      </CheckboxList>
      {modalState.index === name && (
        <Portal>
          <FilterModal
            options={list}
            position={currentPos}
            setModalState={setModalState}
            checkedOptions={checkedTypes}
            toggleCheckbox={toggleCheckbox}
          ></FilterModal>
        </Portal>
      )}
    </FilterContainer>
  );
};
