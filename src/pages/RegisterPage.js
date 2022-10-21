import React, { useCallback, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import colors from "../lib/styles/colors";
import { Input } from "../components/common/Input";
import { LargeButton, SmallButton } from "../components/common/Button";
import { RadioButton, RadioGroup } from "../components/common/RadioButton";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${colors.mono[1]};
`;

const RegisterContainer = styled.div`
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: white;
  box-shadow: rgba(0, 0, 0, 0.6);
`;

const Spacer = styled.div`
  width: 400px;
  height: 100px;
`;

const RegisterFormContainer = styled.form`
  width: 280px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .confirmButton {
    margin-top: 40px;
  }
  .redundancyCheck {
    margin-left: auto;
  }
`;

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        await axios
          // 라우팅 경로 상수화 필요
          .post("/user/create", {
            email: email,
            password: password,
            name: username,
            phone: phoneNumber,
          })
          .then((res) => {
            if (res.status === 200) {
              console.log("Register OK");
            }
          });
      } catch (error) {
        console.log(`${error} occured!`);
      }
    },
    [email, password, username, phoneNumber]
  );

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const onChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <Wrapper>
      <RegisterContainer>
        <Spacer></Spacer>
        <RegisterFormContainer onSubmit={onSubmit}>
          <Input
            placeholder="이름"
            value={username}
            onChange={onChangeUsername}
          ></Input>
          <Input
            placeholder="이메일"
            value={email}
            onChange={onChangeEmail}
          ></Input>
          <div className="redundancyCheck">
            <SmallButton backgroundColor={colors.blue[0]}>중복체크</SmallButton>
          </div>
          <Input
            placeholder="비밀번호"
            value={password}
            onChange={onChangePassword}
          ></Input>
          <Input
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
          ></Input>
          <Input
            placeholder="전화번호"
            value={phoneNumber}
            onChange={onChangePhoneNumber}
          ></Input>
          <div className="confirmButton">
            <LargeButton backgroundColor={colors.blue[0]}>회원가입</LargeButton>
          </div>
        </RegisterFormContainer>
      </RegisterContainer>
    </Wrapper>
  );
};

export default RegisterPage;
