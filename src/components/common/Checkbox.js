import React, { useState, useEffect } from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";

const CheckboxContainer = styled.div`
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 1px 0 1px 0;

  .checkbox {
    width: 15px;
    height: 15px;

    cursor: pointer;
  }
  .optionName {
    margin-left: 5px;
    color: ${colors.mono[0]};

    cursor: pointer;
  }
`;

const Checkbox = (props) => {
  const { isModal, data = { name: "" }, isChecked, toggleCheckbox } = props;

  const onClick = () => {
    toggleCheckbox(data.code);
  };

  return (
    <CheckboxContainer className={isModal ? "modelCheckbox" : ""}>
      <input
        className="checkbox"
        type="checkbox"
        data-testid="checkbox"
        id={data.name}
        checked={isChecked}
        onChange={onClick}
      ></input>
      <label htmlFor={data.name} className="optionName">
        {data.name}
      </label>
    </CheckboxContainer>
  );
};

export default Checkbox;
