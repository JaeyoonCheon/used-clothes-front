import React from "react";
import styled from "styled-components";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { NonModalLayout } from "../components/layout/ModalLayout";
import colors from "../lib/styles/colors";
import { LabelInput } from "../components/common/Input";
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
  height: 350px;
  margin-top: 85px;
  display: flex;
  flex-direction: column;

  .confirmButton {
    margin-top: 40px;
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

const IDForgotPage = () => {
  return (
    <NonModalLayout>
      <ContentContainer>
        <TitleContainer>
          <h2 className="title">아이디 찾기</h2>
          <AiOutlineArrowLeft size={21.33}></AiOutlineArrowLeft>
        </TitleContainer>
        <ForgotFormContainer>
          <LabelInput placeholder="이름" name="username"></LabelInput>
          <TelecomContainer>
            <span className="telecomTitle">통신사</span>
            <select>
              <option value="SKT">SKT</option>
              <option value="KT">KT</option>
              <option value="LG">LG</option>
            </select>
          </TelecomContainer>
          <LabelInput placeholder="전화번호"></LabelInput>
          <div className="authButton">
            <SmallButton isFilled={true} colorTheme={colors.blue[0]}>
              인증하기
            </SmallButton>
          </div>
          <LabelInput placeholder="인증번호"></LabelInput>
          <div className="confirmButton">
            <LargeButton isFilled={true} colorTheme={colors.blue[0]}>
              아이디 찾기
            </LargeButton>
          </div>
        </ForgotFormContainer>
      </ContentContainer>
    </NonModalLayout>
  );
};

export default IDForgotPage;
