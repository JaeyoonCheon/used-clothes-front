import React from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";

const FilterContainer = styled.div`
  width: 180px;
  background: white;

  padding: 5px 0 5px 0;
  border-top: 2px solid ${colors.mono[1]};

  .filter-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
`;

const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Checkbox = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 1px 0 1px 0;
`;

const Filter = (props) => {
  const { filteringData } = props;
  const { name, options } = filteringData;
  const preOptions = [...options].splice(0, 4);

  return (
    <FilterContainer>
      <div className="filter-header">
        <div>{name}</div>
        <div>+</div>
      </div>
      <CheckboxList>
        {preOptions.map((preOption, idx) => (
          <Checkbox key={idx}>
            <input type="checkbox" name="option"></input>
            <label>{preOption}</label>
          </Checkbox>
        ))}
      </CheckboxList>
    </FilterContainer>
  );
};

export default Filter;
