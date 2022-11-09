import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import BaseLayout from "../components/layout/BaseLayout";
import { getUserInfoAPI } from "../lib/api/user";
import colors from "../lib/styles/colors";
import { DefaultInput } from "../components/common/Input";
import { SmallButton } from "../components/common/Button";
import Card from "../components/card/Card";

const Wrapper = styled.div`
  width: 1180px;
  margin: 0 auto;
  padding-top: 50px;
`;

const UserContainer = styled.div`
  width: 100%;
  display: flex;

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

const UserProductContainer = styled.section``;

const MyPage = () => {
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
        <UserContainer>
          <div className="profileImage">
            <img src="360x360.png" alt="profile_image"></img>
          </div>
          <UserInfoContainer>
            <InfoInputContainer>
              <DefaultInput
                placeholder="이메일"
                name="email"
                value={userdata.email}
                isDisabled={true}
                errorMsg=""
              ></DefaultInput>
              <DefaultInput
                placeholder="이름"
                name="username"
                value={userdata.username}
                isDisabled={false}
                errorMsg=""
              ></DefaultInput>
              <DefaultInput
                placeholder="전화번호"
                name="phonenumber"
                value={userdata.phonenumber}
                isDisabled={false}
                errorMsg=""
              ></DefaultInput>
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
        <UserProductContainer></UserProductContainer>
      </Wrapper>
    </BaseLayout>
  );
};

export default MyPage;
