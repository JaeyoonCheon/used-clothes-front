import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import colors from "../../lib/styles/colors";
import { ExpandModalLayout } from "../layout/ModalLayout";
import { NonLabelInput } from "../common/Input";
import { changeFilter } from "../../slices/productSlice";
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

const ExpandModal = (props) => {
  const { list, title, name, actions, canEdit = false } = props;
  const [searchList, setSearchList] = useState(list);
  const [isExist, setIsExist] = useState(true);
  const dispatch = useDispatch();

  const { search, add, toggleModal } = actions;

  const name_id = `${name}_id`;
  const { checkedTypes, searchName } = useSelector((state) => {
    return {
      checkedTypes: canEdit
        ? state.product.selected[name_id]
        : state.product.list.options.filter[name_id],
      searchName: state[name].search,
    };
  });
  console.log(searchName);

  const onChangeSearch = (name, value) => {
    dispatch(search(value));

    if (value) {
      const newList = searchList.filter((item) => item.name.includes(value));
      setSearchList(newList);
    } else {
      setSearchList(list);
    }
  };
  const onClickClose = () => {
    dispatch(toggleModal(false));
  };

  const checkedTypesSet = new Set(checkedTypes);

  const toggleCheckbox = (option) => {
    if (checkedTypesSet.has(option)) {
      checkedTypesSet.delete(option);
    } else {
      checkedTypesSet.add(option);
    }
    dispatch(
      changeFilter({
        name: name_id,
        value: Array.from(checkedTypesSet),
      })
    );
  };
  const isChecked = (option) => {
    if (checkedTypesSet.has(option[name_id])) {
      return true;
    } else {
      return false;
    }
  };
  const onClickAdd = (e) => {
    e.preventDefault();
    dispatch(add(searchName));
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
    <ExpandModalLayout>
      <ModalBox>
        <TitleContainer>
          <h2 className="title">{title}</h2>
          <div className="clearButton">
            <AiOutlineClose size={25} onClick={onClickClose}></AiOutlineClose>
          </div>
        </TitleContainer>
        <ContentContainer>
          <div className="content_nav">
            <div className="search_box">
              <NonLabelInput
                placeholder="찾으려는 이름을 입력해 주세요."
                name="search_name"
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
              {searchList.map((name) => (
                <li key={name[name_id]}>
                  <Checkbox
                    data={name}
                    isChecked={isChecked(name)}
                    toggleCheckbox={() => toggleCheckbox(name[name_id])}
                  ></Checkbox>
                </li>
              ))}
            </ul>
          </div>
        </ContentContainer>
      </ModalBox>
    </ExpandModalLayout>
  );
};

export default ExpandModal;
