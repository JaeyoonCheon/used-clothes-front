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
    color: ${colors.mono[0]};
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

const Wrapper = styled.div`
  width: 100%;
  height: 35px;
  padding: 0;
  margin-top: 10px;
  display: flex;
  align-items: center;

  &:after {
    content: "";
    display: block;
    clear: both;
  }
`;

const Counter = styled.div`
  float: right;
  width: 50px;
  height: 90%;
  z-index: 99;

  color: ${colors.mono[0]};
  font-family: "Noto Serif";
  font-size: 12px;
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

export const LimitedInput = (props) => {
  const { placeholder, name, isRequired = false, limit = 60 } = props;
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);

  const onChange = (e) => {
    setValue(e.target.value);
    if (e.target.value.length >= limit) {
      setValue(e.target.value.substr(0, limit));
    }
    setCount(e.target.value.length);
  };

  return (
    <Wrapper>
      <InputContainer
        type="text"
        value={value}
        placeholder={placeholder}
        name={name}
        isRequired={isRequired}
        onChange={onChange}
      ></InputContainer>
      <Counter>{`${count}/${limit}`}</Counter>
    </Wrapper>
  );
};
