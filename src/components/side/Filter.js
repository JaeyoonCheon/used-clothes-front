import React, { useState } from "react";
import styled from "styled-components";
import { BsPlusSquare } from "react-icons/bs";

import colors from "../../lib/styles/colors";
import Checkbox from "../common/Checkbox";
import FilterModal from "../modal/FilterModal";

const FilterContainer = styled.div`
  width: 180px;
  background: white;

  padding: 5px 0 5px 0;
  border-top: 2px solid ${colors.mono[1]};

  .filter-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    .filterModalButton {
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
    setOptions,
    modalState,
    setModalState,
  } = props;

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
    setOptions((prev) => ({
      ...prev,
      [typeCode]: Array.from(newCheckedTypes),
    }));
  };

  return (
    <FilterContainer>
      <div className="filter-header">
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
        <FilterModal
          options={types}
          position={currentPos}
          setModalState={setModalState}
          checkedOptions={checkedTypes}
          toggleCheckbox={toggleCheckbox}
        ></FilterModal>
      )}
    </FilterContainer>
  );
};
