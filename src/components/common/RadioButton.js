import React from "react";
import styled, { css } from "styled-components";

import colors from "../../lib/styles/colors";

const RadiobuttonContainer = styled.label`
  width: ${(props) => props.width};
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
  padding: 0;

  border: none;
`;

const RadioOptionContainer = styled.label`
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 5px;

  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  color: black;
  background: white;
  line-height: 40px;

  ${(props) =>
    props.selected &&
    css`
      color: white;
      background: ${colors.blue[0]};
    `}

  input[type=radio] {
    display: none;
  }
`;

export const RadioButton = (props) => {
  const {
    children,
    name,
    value,
    width = `120px`,
    defaultChecked,
    onClick,
  } = props;

  return (
    <RadiobuttonContainer width={width}>
      <input
        className="radiobutton"
        type="radio"
        name={name}
        value={value}
        data-testid="radiobutton"
        defaultChecked={defaultChecked}
        onClick={onClick}
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

export const RadioOption = (props) => {
  const { children, id, selected, onClick } = props;

  return (
    <RadioOptionContainer selected={selected} onClick={() => onClick(id)}>
      <input
        className="radiobutton"
        type="radio"
        name={children}
        value={children}
        data-testid="radiobutton"
      ></input>
      {children}
    </RadioOptionContainer>
  );
};
