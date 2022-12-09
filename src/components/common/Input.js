import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";
import useInput from "../../hooks/useInput";

const InputContainer = styled.div`
  margin: 0;
  width: 100%;
  position: relative;

  input:placeholder-shown + label {
    position: absolute;
    color: ${colors.mono[0]};
    font-size: 16px;
    top: 15px;
    left: 0px;
  }
  input:focus + label {
    display: none;
  }
`;

const LabelInputContainer = styled(InputContainer)`
  margin-bottom: 15px;

  input:focus + label,
  label {
    display: inline;
    color: ${(props) => (props.isError ? colors.red[0] : colors.blue[0])};
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
  .errormsg {
    color: ${(props) => (props.isError ? colors.red[0] : colors.blue[0])};
    font-weight: 500;
    font-size: 12px;
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
  &:focus {
    outline: none;
  }
`;

const LabelInputContent = styled(InputContent)`
  &:focus,
  &:not(:placeholder-shown) {
    border-bottom: 1.5px solid
      ${(props) => (props.isError ? colors.red[0] : colors.blue[0])};
    outline: none;
  }
`;

const NonLabelInputContent = styled(InputContent)`
  border: ${(props) => props.noUnderline && `none`};
  &:not(:placeholder-shown) + label {
    display: none;
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

  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 27px;

  &::placeholder {
    color: ${colors.mono[0]};
  }

  &::placeholder::first-letter {
    color: blue;
    /* color: ${(props) => props.isRequired && colors.blue[0]}; */
  }

  &:focus {
    border-bottom: 2px solid ${colors.blue[0]};
  }
`;

export const NonLabelInput = (props) => {
  const {
    placeholder,
    name,
    onChange,
    isDisabled = false,
    initValue = "",
    noUnderline = false,
  } = props;
  const [inputValue, setInputValue] = useInput(initValue);

  const handleChange = (e) => {
    setInputValue(e);
  };
  useEffect(() => {
    onChange(name, inputValue);
  }, [inputValue]);

  return (
    <InputContainer>
      <NonLabelInputContent
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        disabled={isDisabled}
        noUnderline={noUnderline}
      ></NonLabelInputContent>
      <label htmlFor={name}>{placeholder}</label>
    </InputContainer>
  );
};

export const NonLabelPasswordInput = (props) => {
  const {
    placeholder,
    name,
    onChange,
    isDisabled = false,
    initValue = "",
  } = props;
  const [inputValue, setInputValue] = useInput(initValue);

  const handleChange = (e) => {
    setInputValue(e);
  };
  useEffect(() => {
    onChange(name, inputValue);
  }, [inputValue]);

  return (
    <InputContainer>
      <NonLabelInputContent
        type="password"
        name={name}
        id={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        disabled={isDisabled}
      ></NonLabelInputContent>
      <label htmlFor={name}>{placeholder}</label>
    </InputContainer>
  );
};

export const LabelInput = (props) => {
  const {
    placeholder,
    name,
    value,
    onChange,
    isDisabled = false,
    errorMsg,
  } = props;

  const isError = errorMsg !== "" ? true : false;

  return (
    <LabelInputContainer isError={isError}>
      <LabelInputContent
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
        isError={isError}
      ></LabelInputContent>
      <label htmlFor={name}>{placeholder}</label>
      {isError && <span className="errormsg">{errorMsg}</span>}
    </LabelInputContainer>
  );
};

export const LabelPasswordInput = (props) => {
  const {
    placeholder,
    name,
    value,
    onChange,
    isDisabled = false,
    errorMsg,
  } = props;

  const isError = errorMsg !== "" ? true : false;

  return (
    <LabelInputContainer isError={isError}>
      <LabelInputContent
        type="password"
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
        isError={isError}
      ></LabelInputContent>
      <label htmlFor={name}>{placeholder}</label>
      {isError && <span className="errormsg">{errorMsg}</span>}
    </LabelInputContainer>
  );
};

export const LimitedInput = (props) => {
  const {
    placeholder,
    name,
    isDisabled = false,
    limit = 60,
    onChange,
    initValue = "",
  } = props;
  const setLimit = (value) => value.length < limit;

  const [value, setValue] = useInput(initValue, setLimit);
  const [count, setCount] = useState(0);

  const handleChange = (e) => {
    setValue(e);
    setCount(e.target.value.length);
    onChange(name, value);
  };

  return (
    <InputContainer>
      <NonLabelInputContent
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={isDisabled}
      ></NonLabelInputContent>
      <label htmlFor={name}>{placeholder}</label>
      <Counter>{`${count}/${limit}`}</Counter>
    </InputContainer>
  );
};

export const LimitedTextarea = (props) => {
  const {
    placeholder,
    name,
    isRequired = false,
    limit = 60,
    onChange,
    initValue = "",
  } = props;
  const setLimit = (value) => value.length < limit;

  const [value, setValue] = useInput(initValue, setLimit);
  const [count, setCount] = useState(0);

  const textArea = useRef();
  const handleChange = (e) => {
    setValue(e);
    setCount(e.target.value.length);
    textArea.current.style.height = "auto";
    textArea.current.style.height = textArea.current.scrollHeight + `px`;
    onChange(name, value);
  };

  useEffect(() => {
    textArea.current.style.height = "auto";
    textArea.current.style.height = textArea.current.scrollHeight + `px`;
  }, []);

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
        onChange={handleChange}
      ></TextContainer>
      <Counter>{`${count}/${limit}`}</Counter>
    </>
  );
};

export const NonHookInput = (props) => {
  const { placeholder, name, onChange, value, isDisabled = false } = props;

  return (
    <InputContainer>
      <NonLabelInputContent
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      ></NonLabelInputContent>
      <label htmlFor={name}>{placeholder}</label>
    </InputContainer>
  );
};

export const NonHookPasswordInput = (props) => {
  const { placeholder, name, value, onChange, isDisabled = false } = props;

  return (
    <InputContainer>
      <NonLabelInputContent
        type="password"
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      ></NonLabelInputContent>
      <label htmlFor={name}>{placeholder}</label>
    </InputContainer>
  );
};
