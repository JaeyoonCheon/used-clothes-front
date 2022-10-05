import React, { useState, useEffect } from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";

const RadiobuttonContainer = styled.label`
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 1px 0 1px 0;
  margin-left: 5px;
  color: ${colors.mono[0]};

  cursor: pointer;

  .radiobutton {
    width: 15px;
    height: 15px;

    cursor: pointer;
  }
`;

const RadioGroupContainer = styled.fieldset`
  display: flex;
  border: none;
`;

export const RadioButton = (props) => {
  const { children, name, value, defaultChecked } = props;

  return (
    <RadiobuttonContainer>
      <input
        className="radiobutton"
        type="radio"
        name={name}
        value={value}
        data-testid="radiobutton"
        defaultChecked={defaultChecked}
      ></input>
      {children}
    </RadiobuttonContainer>
  );
};

export const RadioGroup = (props) => {
  const { children, label = false } = props;

  return (
    <RadioGroupContainer>
      {label && <legend>{label}</legend>}
      {children}
    </RadioGroupContainer>
  );
};
