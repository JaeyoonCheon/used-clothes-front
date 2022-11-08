import React, { useState, useRef } from "react";
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
  font-size: 12px;
  text-align: right;
`;

const TextContainer = styled.textarea`
  display: block;
  width: ${(props) => props.width || `100%`};
  padding: 0;
  margin-top: 10px;

  border: none;
  border-bottom: 1.5px solid ${colors.mono[0]};
  outline: none;
  resize: none;
  line-height: 18px;

  &::placeholder {
    color: ${colors.mono[0]};
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

const InputBox = styled.div`
  margin: 0px 0px 15px 0;
  width: 100%;
  position: relative;

  input:placeholder-shown + label {
    position: absolute;
    color: ${colors.mono[0]};
    font-size: 16px;
    top: 15px;
    left: 0px;
  }
  input:focus + label,
  label {
    color: ${colors.blue[0]};
    font-weight: 500;
    font-size: 10px;
    pointer-events: none;
    position: absolute;
    top: 0px;
    left: 0px;

    transition: all 0.1s ease;
    -webkit-transition: all 0.1s ease;
    -moz-transition: all 0.1s ease;
    -o-transition: all 0.1s ease;
  }
`;

const InputContent = styled.input`
  padding: 20px 0px 5px 0px;

  border: none;
  border-bottom: 1.5px solid ${colors.mono[0]};
  background-color: transparent;
  font-size: 16px;
  width: 100%;

  &::placeholder {
    color: transparent;
  }

  &:focus,
  &:not(:placeholder-shown) {
    border-bottom: 1.5px solid ${colors.blue[0]};
    outline: none;
  }
`;

export const DefaultInput = (props) => {
  const { placeholder, name, value, onChange } = props;

  return (
    <InputBox>
      <InputContent
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></InputContent>
      <label htmlFor={name}>{placeholder}</label>
    </InputBox>
  );
};

export const Input = (props) => {
  const {
    placeholder,
    name,
    value,
    isPassword = false,
    onChange,
    isRequired = false,
  } = props;

  return (
    <>
      <InputContainer
        type={isPassword ? "password" : "text"}
        value={value}
        placeholder={placeholder}
        name={name}
        isRequired={isRequired}
        onChange={onChange}
      ></InputContainer>
      {props.children}
    </>
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

export const LimitedTextarea = (props) => {
  const { placeholder, name, isRequired = false, limit = 60 } = props;
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);

  const textArea = useRef();
  const onChange = (e) => {
    setValue(e.target.value);
    if (e.target.value.length >= limit) {
      setValue(e.target.value.substr(0, limit));
    }
    setCount(e.target.value.length);
    textArea.current.style.height = "auto";
    textArea.current.style.height = textArea.current.scrollHeight + `px`;
  };

  return (
    <>
      <TextContainer
        type="text"
        ref={textArea}
        value={value}
        placeholder={placeholder}
        name={name}
        isRequired={isRequired}
        rows={1}
        onChange={onChange}
      ></TextContainer>
      <Counter>{`${count}/${limit}`}</Counter>
    </>
  );
};
