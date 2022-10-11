import React, { useState } from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";

const InputContainer = styled.input`
  width: 100%;
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
    /* color: ${(props) => props.isRequired && colors.blue[0]}; */
  }

  &:focus {
    border-bottom: 2px solid ${colors.blue[0]};
  }
`;

export const Input = (props) => {
  const { placeholder, name, isRequired = false } = props;
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <InputContainer
      type="text"
      value={value}
      placeholder={placeholder}
      name={name}
      isRequired={isRequired}
      onChange={onChange}
    ></InputContainer>
  );
};
