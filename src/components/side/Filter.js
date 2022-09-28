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

  return (
    <FilterContainer>
      <div className="filter-header">
        <div>{name}</div>
        <BsPlusSquare
          onClick={(e) => {
            const pos = [e.pageX, e.pageY];
            setCurrentPos(pos);
            setModalState({ ...modalState, index: idx });
          }}
        ></BsPlusSquare>
      </div>
      <CheckboxList>
        {preOptions.map((preOption, idx) => (
          <Checkbox key={idx}>
            <input type="checkbox" name="option"></input>
            <label>{preOption}</label>
          </Checkbox>
        ))}
      </CheckboxList>
      {modalState.index === idx && (
        <FilterModal
          options={options}
          position={currentPos}
          setModalState={setModalState}
        ></FilterModal>
      )}
    </FilterContainer>
  );
};

export default Filter;
