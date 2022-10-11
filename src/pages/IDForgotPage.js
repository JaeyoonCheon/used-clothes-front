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
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .confirmButton {
    margin-top: 40px;
  }
  .authButton {
    margin-left: auto;
  }
`;

const TelecomContainer = styled.div`
  width: 280px;
  height: 25px;
  margin-top: 10px;

  .telecomTitle {
    margin-right: 10px;
    font-family: "Noto Serif";
    font-size: 12px;
    color: ${colors.mono[0]};
  }
`;

const IDForgotPage = () => {
  const [confirmType, setConfirmType] = useState("phone");
  return (
    <Wrapper>
      <ForgotContainer>
        <Spacer></Spacer>
        <ForgotFormContainer>
          <RadioGroup>
            <RadioButton name="confirmType" value="phone" defaultChecked>
              전화번호
            </RadioButton>
            <RadioButton name="confirmType" value="email">
              이메일
            </RadioButton>
          </RadioGroup>
          <Input placeholder="이름"></Input>
          {confirmType === "phone" && (
            <>
              <TelecomContainer>
                <span className="telecomTitle">통신사</span>
                <select>
                  <option value="SKT">SKT</option>
                  <option value="KT">KT</option>
                  <option value="LG">LG</option>
                </select>
              </TelecomContainer>
              <Input placeholder="전화번호"></Input>
            </>
          )}
          {confirmType === "email" && (
            <>
              <Input placeholder="이메일"></Input>
            </>
          )}
          <div className="authButton">
            <SmallButton backgroundColor={colors.blue[0]}>인증하기</SmallButton>
          </div>
          <Input placeholder="인증번호"></Input>
          <div className="confirmButton">
            <LargeButton backgroundColor={colors.blue[0]}>
              아이디 찾기
            </LargeButton>
          </div>
        </ForgotFormContainer>
      </ForgotContainer>
    </Wrapper>
  );
};

export default IDForgotPage;
