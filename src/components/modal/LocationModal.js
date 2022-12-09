import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RiSearchLine } from "react-icons/ri";

import { NonOverlayModalLayout } from "../layout/ModalLayout";
import colors from "../../lib/styles/colors";
import { LargeButton } from "../common/Button";
import { Input, LabelInput, LabelPasswordInput } from "../common/Input";
import {
  getScopeAList,
  getScopeBList,
  getScopeCList,
} from "../../slices/locationSlice";
import { changeLocation } from "../../slices/productSlice";
import { toggleLocationModal } from "../../slices/modalSlice";
import useInput from "../../hooks/useInput";

const ModalBox = styled.div`
  width: 320px;
  margin: 40px auto 30px auto;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    margin: 0;

    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 38px;
    letter-spacing: -0.05em;
  }
  .clear_button {
    margin-left: auto;
  }
`;
const ContentContainer = styled.div`
  height: 400px;
  margin-top: 90px;

  .search_box {
    width: 300px;
    margin: 30px auto 0 0;
    padding-left: 10px;
    display: flex;

    border: 0.5px solid ${colors.mono[0]};

    .search_location_box {
      .search_location {
        all: unset;
        width: 100%;

        line-height: 25px;
      }
    }
    .search_button {
      display: block;
      margin-left: auto;

      border: none;
      background: transparent;

      cursor: pointer;
    }
  }
  .search_list {
    margin-top: 25px;
    margin-bottom: 40px;
    height: 310px;
    padding: 10px 30px;
    overflow-x: auto;
    overflow-y: scroll;

    border: 1px solid ${colors.mono[0]};
  }
  .search_list ul {
    .location_item {
      margin-top: 2px;
      display: list-item;
      list-style: none;

      cursor: pointer;
    }
  }
`;

const LocationModal = () => {
  const dispatch = useDispatch();
  const [searchWord, setSearchWord] = useInput("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    dispatch(getScopeAList());
    dispatch(getScopeBList());
    dispatch(getScopeCList());
  }, []);

  const { scopeA, scopeB, scopeC } = useSelector((state) => {
    const list = state.location.list;
    return {
      scopeA: list.scopeA,
      scopeB: list.scopeB,
      scopeC: list.scopeC,
    };
  });

  const findLocation = (searchWord) => {
    let searchResult = [];

    searchResult = [].concat(
      searchResult,
      scopeA.filter((loc) => loc.scope_a_name.includes(searchWord))
    );
    searchResult = [].concat(
      searchResult,
      scopeB.filter(
        (loc) =>
          loc.scope_a_name.includes(searchWord) ||
          loc.scope_b_name.includes(searchWord)
      )
    );
    searchResult = [].concat(
      searchResult,
      scopeC.filter(
        (loc) =>
          loc.scope_a_name.includes(searchWord) ||
          loc.scope_b_name.includes(searchWord) ||
          loc.scope_c_name.includes(searchWord)
      )
    );

    return searchResult;
  };

  const onClickClose = () => {
    dispatch(toggleLocationModal(false));
  };
  const onSubmitSearch = (e) => {
    e.preventDefault();
    const result = findLocation(searchWord);
    console.log(`submit! result:${result}`);
    setSearchResult(result);
  };
  const onClickLocation = (loc) => {
    let locationName = loc.scope_a_name;
    dispatch(
      changeLocation({
        name: "scope_a_code",
        value: loc.scope_a_code,
      })
    );
    if (loc.hasOwnProperty("scope_b_code")) {
      dispatch(
        changeLocation({
          name: "scope_b_code",
          value: loc.scope_b_code,
        })
      );
      locationName = `${locationName} ${loc.scope_b_name}`;
    } else {
      dispatch(
        changeLocation({
          name: "scope_b_code",
          value: null,
        })
      );
    }
    if (loc.hasOwnProperty("scope_c_code")) {
      dispatch(
        changeLocation({
          name: "scope_c_code",
          value: loc.scope_c_code,
        })
      );
      locationName = `${locationName} ${loc.scope_c_name}`;
    } else {
      dispatch(
        changeLocation({
          name: "scope_c_code",
          value: null,
        })
      );
    }
    dispatch(
      dispatch(
        changeLocation({
          name: "location",
          value: locationName,
        })
      )
    );
    dispatch(toggleLocationModal(false));
  };

  return (
    <NonOverlayModalLayout>
      <ModalBox>
        <TitleContainer>
          <h2 className="title">지역 검색</h2>
          <div className="clearButton" onClick={onClickClose}>
            <AiOutlineClose size={20}></AiOutlineClose>
          </div>
        </TitleContainer>
        <ContentContainer>
          <form className="search_box" onSubmit={onSubmitSearch}>
            <div className="search_location_box">
              <input
                className="search_location"
                placeholder="찾으려는 지역명을 입력해 주세요."
                name="search_location"
                value={searchWord}
                onChange={setSearchWord}
              ></input>
            </div>
            <button className="search_button" type="submit">
              <RiSearchLine data-testid="search"></RiSearchLine>
            </button>
          </form>
          <div className="search_list">
            <ul className="location_list">
              {searchResult.map((loc) => {
                console.log(loc);
                if (loc.hasOwnProperty("scope_c_name")) {
                  return (
                    <li
                      key={loc.scope_c_code}
                      className="location_item"
                      onClick={() => onClickLocation(loc)}
                    >{`${loc.scope_a_name} ${loc.scope_b_name} ${loc.scope_c_name}`}</li>
                  );
                } else {
                  if ("scope_b_name" in loc) {
                    return (
                      <li
                        key={loc.scope_b_code}
                        className="location_item"
                        onClick={() => onClickLocation(loc)}
                      >{`${loc.scope_a_name} ${loc.scope_b_name}`}</li>
                    );
                  } else {
                    return (
                      <li
                        key={loc.scope_a_code}
                        className="location_item"
                        onClick={() => onClickLocation(loc)}
                      >{`${loc.scope_a_name}`}</li>
                    );
                  }
                }
              })}
            </ul>
          </div>
        </ContentContainer>
      </ModalBox>
    </NonOverlayModalLayout>
  );
};

export default LocationModal;
