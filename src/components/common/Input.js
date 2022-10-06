import React, { useState } from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";

const LargeInputContainer = styled.input`
  width: 280px;
  height: 25px;
  padding: 0;
  margin-top: 10px;

  border: none;
  border-bottom: 1.5px solid ${colors.mono[0]};
  outline: none;

  &::placeholder {
    font-family: "Noto Serif";
    font-size: 12px;
  }

  &::placeholder::first-letter {
    color: blue;
    /* color: ${(props) => props.required && colors.blue[0]}; */
  }

  &:focus {
    border-bottom: 2px solid ${colors.blue[0]};
  }
`;

export const LargeInput = (props) => {
  const { placeholder, name, required = false } = props;
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <LargeInputContainer
      type="text"
      value={value}
      placeholder={placeholder}
      name={name}
      required={required}
      onChange={onChange}
    ></LargeInputContainer>
  );
};
