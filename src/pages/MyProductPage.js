import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import BaseLayout from "../components/layout/BaseLayout";
import { getUserInfoAPI } from "../lib/api/user";
import colors from "../lib/styles/colors";
import { LabelInput } from "../components/common/Input";
import { SmallButton } from "../components/common/Button";
import CardList from "../components/card/CardList";

import { itemDatas } from "../lib/dummydata/dummydata";

const Wrapper = styled.div`
  width: 1180px;
  margin: 0 auto;
  padding-top: 50px;
`;

const UserProductContainer = styled.section`
  width: 100%;
`;

const UserProductHeader = styled.div`
  display: flex;
  width: 100%;
`;

const UserProductCounter = styled.div`
  display: flex;
  margin-right: 30px;

  span {
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 38px;
    align-items: center;

    color: #000000;

    &.count {
      margin-left: 15px;
      color: ${colors.blue[0]};
    }
  }
`;

const UserProductButtonContainer = styled.div`
  display: flex;
  width: 180px;

  align-items: center;
  justify-content: space-between;
`;

const MyProductPage = () => {
  const [userdata, setUserdata] = useState({
    email: "tester01@gmail.com",
    username: "홍길동",
    phonenumber: "010-1234-5678",
  });

  useEffect(() => {
    const result = getUserInfoAPI();
    setUserdata(result);
  }, []);

  return (
    <BaseLayout>
      <Wrapper>
        <UserProductContainer>
          <UserProductHeader>
            <UserProductCounter>
              <span>상품</span>
              <span className="count">10</span>
            </UserProductCounter>
            <UserProductButtonContainer>
              <Link to="/additem">
                <SmallButton
                  isFilled={false}
                  colorTheme={colors.blue[0]}
                  fontColor={colors.blue[0]}
                >
                  상품 등록
                </SmallButton>
              </Link>
              <SmallButton
                isFilled={false}
                colorTheme={colors.blue[0]}
                fontColor={colors.blue[0]}
              >
                자세히 보기
              </SmallButton>
            </UserProductButtonContainer>
          </UserProductHeader>
          <hr />
          <CardList itemDatas={itemDatas} />
        </UserProductContainer>
      </Wrapper>
    </BaseLayout>
  );
};

export default MyProductPage;
