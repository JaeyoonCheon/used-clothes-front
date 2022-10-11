import React, { useState } from "react";
import styled from "styled-components";

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

const ForgotContainer = styled.div`
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

const ForgotFormContainer = styled.form`
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
  return (
    <Wrapper>
      <ForgotContainer>
        <Spacer></Spacer>
        <ForgotFormContainer>
          <Input placeholder="* 이름" isRequired={true}></Input>
          <Input placeholder="* 이메일"></Input>
          <div className="redundancyCheck">
            <SmallButton backgroundColor={colors.blue[0]}>중복체크</SmallButton>
          </div>
          <Input placeholder="* 비밀번호"></Input>
          <Input placeholder="* 비밀번호 확인"></Input>
          <Input placeholder="* 전화번호"></Input>
          <div className="confirmButton">
            <LargeButton backgroundColor={colors.blue[0]}>회원가입</LargeButton>
          </div>
        </ForgotFormContainer>
      </ForgotContainer>
    </Wrapper>
  );
};

export default RegisterPage;
