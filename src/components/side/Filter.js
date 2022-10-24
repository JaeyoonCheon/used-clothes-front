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

const Filter = (props) => {
  const { idx, filteringData, modalState, setModalState } = props;
  const { name, options } = filteringData;
  const preOptions = [...options].splice(0, 4);

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
    <FilterContainer>
      <div className="filter-header">
        <div>{name}</div>
        <BsPlusSquare
          className="filterModalButton"
          onClick={(e) => {
            const pos = [e.pageX, e.pageY];
            setCurrentPos(pos);
            setModalState({ ...modalState, index: idx });
          }}
        ></BsPlusSquare>
      </div>
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
      {modalState.index === idx && (
        <FilterModal
          options={options}
          position={currentPos}
          setModalState={setModalState}
          checkedOptions={checkedOptions}
          toggleCheckbox={toggleCheckbox}
        ></FilterModal>
      )}
    </FilterContainer>
  );
};

export default Filter;

export const CheckboxFilter = (props) => {
  const { idx, name, types, modalState, setModalState } = props;

  const representativeTypes = [...types].splice(0, 4);

  const [currentPos, setCurrentPos] = useState([]);
  const [checkedTypes, setCheckedTypes] = useState(new Set());

  const toggleCheckbox = (type) => {
    if (checkedTypes.has(type)) {
      const newCheckedTypes = new Set(checkedTypes);
      newCheckedTypes.delete(type);
      setCheckedTypes(newCheckedTypes);
    } else {
      const newCheckedTypes = new Set(checkedTypes);
      newCheckedTypes.add(type);
      setCheckedTypes(newCheckedTypes);
    }
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
            setModalState({ ...modalState, index: idx });
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
      {modalState.index === idx && (
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
