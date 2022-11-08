import React from "react";
import styled from "styled-components";
import { AiOutlineArrowLeft } from "react-icons/ai";

import colors from "../lib/styles/colors";
import { NonModalLayout } from "../components/layout/ModalLayout";
import { DefaultInput } from "../components/common/Input";
import { LargeButton, SmallButton } from "../components/common/Button";

const ContentContainer = styled.div`
  width: 320px;
  min-height: 500px;
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
    letter-spacing: -0.1em;
  }
`;

const ForgotFormContainer = styled.form`
  width: 320px;
  display: flex;
  flex-direction: column;
  margin-top: 85px;

  .confirmButton {
    margin-top: 20px;
  }
  .authButton {
    margin-left: auto;
  }
`;

const TelecomContainer = styled.div`
  width: 320px;
  height: 25px;
  margin: 20px 0;

  .telecomTitle {
    margin-right: 10px;
    font-size: 16px;
    color: ${colors.mono[0]};
  }
`;

const PWForgotPage = () => {
  return (
    <NonModalLayout>
      <ContentContainer>
        <TitleContainer>
          <h2 className="title">비밀번호 찾기</h2>
          <AiOutlineArrowLeft size={21.33}></AiOutlineArrowLeft>
        </TitleContainer>
        <ForgotFormContainer>
          <DefaultInput placeholder="이름"></DefaultInput>
          <DefaultInput placeholder="이메일"></DefaultInput>
          <TelecomContainer>
            <span className="telecomTitle">통신사</span>
            <select>
              <option value="SKT">SKT</option>
              <option value="KT">KT</option>
              <option value="LG">LG</option>
            </select>
          </TelecomContainer>
          <DefaultInput placeholder="전화번호"></DefaultInput>
          <div className="authButton">
            <SmallButton isFilled={true} colorTheme={colors.blue[0]}>
              인증하기
            </SmallButton>
          </div>
          <DefaultInput placeholder="인증번호"></DefaultInput>
          <div className="confirmButton">
            <LargeButton isFilled={true} colorTheme={colors.blue[0]}>
              비밀번호 찾기
            </LargeButton>
          </div>
        </ForgotFormContainer>
      </ContentContainer>
    </NonModalLayout>
  );
};

export default PWForgotPage;
