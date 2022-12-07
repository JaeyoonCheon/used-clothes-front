import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import BaseLayout from "../components/layout/BaseLayout";
import { checkAPI } from "../lib/api/user";
import colors from "../lib/styles/colors";
import { LabelInput } from "../components/common/Input";
import { SmallButton } from "../components/common/Button";
import { LargeCardList } from "../components/card/CardList";

import { itemDatas } from "../lib/dummydata/dummydata";

const Wrapper = styled.div`
  width: 1180px;
  margin: 0 auto;
  padding-top: 50px;
`;

const UserContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 60px;

  .profileImage {
    width: 360px;
    height: 360px;
  }
`;

const UserInfoContainer = styled.div`
  margin-left: 75px;
  width: 360px;
  height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoInputContainer = styled.div`
  width: 100%;
`;

const ProfileButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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

const MyPage = () => {
  const [userdata, setUserdata] = useState({
    email: "tester01@gmail.com",
    username: "홍길동",
    phonenumber: "010-1234-5678",
  });

  useEffect(() => {
    const result = checkAPI();
    setUserdata(result);
  }, []);

  return (
    <BaseLayout>
      <Wrapper>
        <UserContainer>
          <div className="profileImage">
            <img src="360x360.png" alt="profile_image"></img>
          </div>
          <UserInfoContainer>
            <InfoInputContainer>
              <LabelInput
                placeholder="이메일"
                name="email"
                value={userdata.email}
                isDisabled={true}
                errorMsg=""
              ></LabelInput>
              <LabelInput
                placeholder="이름"
                name="username"
                value={userdata.username}
                isDisabled={false}
                errorMsg=""
              ></LabelInput>
              <LabelInput
                placeholder="전화번호"
                name="phonenumber"
                value={userdata.phonenumber}
                isDisabled={false}
                errorMsg=""
              ></LabelInput>
            </InfoInputContainer>
            <ProfileButtonContainer>
              <SmallButton
                isFilled={false}
                colorTheme={colors.mono[0]}
                fontColor={colors.mono[0]}
              >
                사진 변경
              </SmallButton>
              <SmallButton
                isFilled={false}
                colorTheme={colors.mono[0]}
                fontColor={colors.mono[0]}
              >
                비밀번호 변경
              </SmallButton>
              <SmallButton
                isFilled={false}
                colorTheme={colors.mono[0]}
                fontColor={colors.mono[0]}
              >
                개인정보 수정
              </SmallButton>
              <SmallButton
                isFilled={false}
                colorTheme={colors.red[0]}
                fontColor={colors.red[0]}
              >
                회원탈퇴
              </SmallButton>
            </ProfileButtonContainer>
          </UserInfoContainer>
        </UserContainer>
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
          <LargeCardList itemDatas={itemDatas} />
        </UserProductContainer>
      </Wrapper>
    </BaseLayout>
  );
};

export default MyPage;
