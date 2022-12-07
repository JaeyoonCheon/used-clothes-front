import React, { useState, useEffect } from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";

const CheckboxContainer = styled.div`
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 3px 0;

  .checkbox {
    width: 15px;
    height: 15px;
    display: none;

    cursor: pointer;
  }
  .label_checkbox {
    width: 18px;
    height: 18px;
    margin-right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: white;
    border: 0.5px solid #c0c0c0;

    cursor: pointer;

    .label_checkbox_mark {
      width: 10px;
      height: 10px;
      background-color: white;
    }
  }
  .checkbox:checked + label {
    .label_checkbox_mark {
      background-color: #808080;
    }
  }
  .label_name {
    margin-left: 5px;
    color: black;

    cursor: pointer;
  }
`;

const ColorCheckboxContainer = styled.div`
  width: 22px;
  height: 22px;
  margin: 3px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${(props) => props.color};
  border: 0.5px solid #eeeeee;

  cursor: pointer;

  &.checked {
    border: 0.5px solid black;
  }
`;

const Checkbox = (props) => {
  const { isModal, data = { name: "" }, isChecked, toggleCheckbox } = props;

  const onChange = () => {
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
        onChange={onChange}
      ></input>
      <label htmlFor={data.name} className="label_checkbox">
        <div className="label_checkbox_mark"></div>
      </label>
      <label htmlFor={data.name} className="label_name">
        {data.name}
      </label>
    </CheckboxContainer>
  );
};

export default Checkbox;

export const ColorCheckbox = (props) => {
  const { color, name, isChecked, toggleCheckbox } = props;

  const onClick = () => {
    toggleCheckbox(color);
  };

  return (
    <ColorCheckboxContainer
      className={isChecked && "checked"}
      color={color}
      title={name}
      onClick={onClick}
    ></ColorCheckboxContainer>
  );
};
