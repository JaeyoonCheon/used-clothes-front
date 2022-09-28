import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { RiSearchLine } from "react-icons/ri";

import colors from "../../lib/styles/colors";

const FormContainer = styled.form`
  position: relative;
  width: 580px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${colors.mono[1]};
  border-radius: 20px;

  .button {
    position: absolute;
    right: 20px;
  }
`;

const SearchbarInput = styled.input`
  width: 500px;
  border: none;
  background-color: ${colors.mono[1]};
  margin-left: 10px;
  padding-left: 10px;

  &:focus {
    outline: none;
  }
`;

const Searchbar = () => {
  const [keyword, setKeyword] = useState("");
  const onChange = useCallback(
    (e) => {
      setKeyword(e.target.value);
    },
    [setKeyword]
  );
  const onSubmit = (e) => {
    e.preventDefault();
    setKeyword("");
  };

  return (
    <div className="searchbar">
      <FormContainer>
        <SearchbarInput
          type="text"
          value={keyword}
          placeholder="찾으시는 상품명,판매자를 입력해 주세요."
          onChange={onChange}
        ></SearchbarInput>
        <RiSearchLine
          className="button"
          type="submit"
          onClick={onSubmit}
        ></RiSearchLine>
      </FormContainer>
    </div>
  );
};

export default Searchbar;
