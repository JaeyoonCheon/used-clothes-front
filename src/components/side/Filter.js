import React, { useState } from "react";
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
  const {
    typeCode,
    name,
    types,
    options,
    onClickOption,
    modalState,
    setModalState,
  } = props;

  const dispatch = useDispatch();

  const representativeTypes = [...types].splice(0, 4);

  const [currentPos, setCurrentPos] = useState([]);
  const [checkedTypes, setCheckedTypes] = useState(new Set());

  const toggleCheckbox = (type) => {
    const newCheckedTypes = new Set(checkedTypes);

    if (checkedTypes.has(type)) {
      newCheckedTypes.delete(type);
    } else {
      newCheckedTypes.add(type);
    }
    setCheckedTypes(newCheckedTypes);
    dispatch(
      changeArrayOption({
        name: typeCode,
        value: Array.from(newCheckedTypes),
      })
    );
  };

  return (
    <FilterContainer>
      <div className="filter_header">
        <div>{name}</div>
        <BsPlusSquare
          className="filterModalButton"
          onClick={(e) => {
            const pos = [e.pageX, e.pageY];
            setCurrentPos(pos);
            setModalState({ ...modalState, index: typeCode });
          }}
        ></BsPlusSquare>
      </div>
      <CheckboxList>
        {representativeTypes.map((type) => (
          <Checkbox
            key={type}
            checkboxLabel={type}
            checkedOptions={checkedTypes}
            toggleCheckbox={toggleCheckbox}
          ></Checkbox>
        ))}
      </CheckboxList>
      {modalState.index === typeCode && (
        <Portal>
          <FilterModal
            options={types}
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
