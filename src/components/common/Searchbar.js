import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { RiSearchLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changeFilter } from "../../slices/productSlice";
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

    cursor: pointer;
  }
`;

const SearchbarInput = styled.input`
  width: 500px;
  margin-left: 10px;
  padding-left: 10px;

  border: none;
  background-color: ${colors.mono[1]};
  font-size: 16px;
  font-weight: 400;
  &:focus {
    outline: none;
  }
`;

const Searchbar = () => {
  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = useCallback(
    (e) => {
      setKeyword(e.target.value);
    },
    [setKeyword]
  );
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    dispatch(
      changeFilter({
        name: "name",
        value: keyword,
      })
    );
    navigate("/");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  };

  return (
    <div className="searchbar">
      <FormContainer>
        <SearchbarInput
          type="text"
          value={keyword}
          placeholder="찾으시는 상품명,판매자를 입력해 주세요."
          onChange={onChange}
          onKeyDown={handleKeyDown}
        ></SearchbarInput>
        <RiSearchLine
          className="button"
          type="submit"
          data-testid="search"
          onClick={onSubmit}
        ></RiSearchLine>
      </FormContainer>
    </div>
  );
};

export default Searchbar;
