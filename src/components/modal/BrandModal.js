import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import colors from "../../lib/styles/colors";
import { BrandModalLayout } from "../layout/ModalLayout";
import { NonLabelInput } from "../common/Input";
import { searchBrand, addBrand } from "../../slices/brandSlice";
import { toggleBrandModal } from "../../slices/modalSlice";
import Checkbox from "../common/Checkbox";
import { SmallButton } from "../common/Button";

const ModalBox = styled.div`
  width: 720px;
  margin: 40px auto 30px auto;
`;

const TitleContainer = styled.span`
  display: flex;
  align-items: center;
  padding-bottom: 15px;

  .title {
    margin: 0;

    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 38px;
    letter-spacing: -0.05em;
  }
  .clearButton {
    margin-left: auto;
  }
`;

const ContentContainer = styled.div`
  border-top: 2px solid ${colors.mono[0]};

  .content_nav {
    display: flex;
    align-items: baseline;

    .create_button {
      cursor: pointer;
    }
  }
  .search_box {
    width: 300px;
    margin: 30px auto 0 0;
    padding: 0 10px;

    border: 0.5px solid ${colors.mono[0]};
  }
  .search_list {
    margin-top: 25px;
    margin-bottom: 40px;
    height: 310px;
    padding: 10px 30px;

    border: 1px solid ${colors.mono[0]};
  }
`;

const BrandModal = (props) => {
  const { list, checkedTypes, setCheckedTypes, canEdit = false } = props;
  const [searchList, setSearchList] = useState(list);
  const [isExist, setIsExist] = useState(true);
  const dispatch = useDispatch();

  const { searchName } = useSelector((state) => {
    return { searchName: state.brand.searchBrand };
  });

  const onChangeSearch = (name, value) => {
    dispatch(searchBrand(value));

    if (value) {
      const newList = searchList.filter((brand) => brand.name.includes(value));
      setSearchList(newList);
    } else {
      setSearchList(list);
    }
  };
  const onClickClose = () => {
    dispatch(toggleBrandModal(false));
  };
  const toggleCheckbox = (option) => {
    const newCheckedTypes = new Set(checkedTypes);

    if (checkedTypes.has(option)) {
      newCheckedTypes.delete(option);
    } else {
      newCheckedTypes.add(option);
    }
    setCheckedTypes(newCheckedTypes);
  };
  const isChecked = (option) => {
    if (checkedTypes.has(option.brand_id)) {
      return true;
    } else {
      return false;
    }
  };
  const onClickAdd = (e) => {
    e.preventDefault();
    dispatch(addBrand(searchName));
  };

  useEffect(() => {
    if (searchList.length === 0) {
      setIsExist(false);
    } else {
      setIsExist(true);
    }
  }, [searchList]);

  console.log(`canEdit:${canEdit} IsExist:${isExist}`);

  return (
    <BrandModalLayout>
      <ModalBox>
        <TitleContainer>
          <h2 className="title">브랜드</h2>
          <div className="clearButton">
            <AiOutlineClose size={25} onClick={onClickClose}></AiOutlineClose>
          </div>
        </TitleContainer>
        <ContentContainer>
          <div className="content_nav">
            <div className="search_box">
              <NonLabelInput
                placeholder="찾으려는 브랜드명을 입력해 주세요."
                name="search_brand"
                onChange={onChangeSearch}
                noUnderline={true}
              ></NonLabelInput>
            </div>
            {canEdit && !isExist && (
              <span className="create_button" onClick={onClickAdd}>
                새로 추가하기
              </span>
            )}
          </div>
          <div className="search_list">
            <ul>
              {searchList.map((brand) => (
                <li key={brand.brand_id}>
                  <Checkbox
                    data={brand}
                    isChecked={isChecked(brand)}
                    toggleCheckbox={() => toggleCheckbox(brand.brand_id)}
                  ></Checkbox>
                </li>
              ))}
            </ul>
          </div>
        </ContentContainer>
      </ModalBox>
    </BrandModalLayout>
  );
};

export default BrandModal;
