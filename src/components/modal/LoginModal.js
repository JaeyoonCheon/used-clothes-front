import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

import colors from "../../lib/styles/colors";
import { LargeButton } from "../common/Button";
import { Input } from "../common/Input";
import useInput from "../../hooks/useInput";

const ModalOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;

  background: rgba(0, 0, 0, 0.6);
`;

const ModalContainer = styled.div`
  position: absolute;
  width: 400px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background: white;

  .clearButton {
    display: flex;
    justify-content: flex-end;
    margin: 5px;

    color: ${colors.mono[0]};

    cursor: pointer;
  }
`;

const LogoContainer = styled.div`
  height: 60px;
`;

const FeatureContainer = styled.div`
  width: 280px;
  margin-left: auto;
  margin-right: auto;
`;

const LoginFeature = styled.form`
  display: flex;
  align-items: center;
  margin-top: 20px;
  flex-direction: column;
`;

const LoginButton = styled.div`
  margin-top: 20px;
  width: fit-content;
`;

const ForgotRegisterFeature = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
  margin-left: auto;

  .forgotRegisterButton {
    margin-left: 15px;

    font-size: 12px;
    cursor: pointer;
  }
`;

const SocialLoginFeature = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 20px 0;
  flex-direction: column;

  .socialLoginButton {
    margin-top: 15px;
  }
`;

const LoginModal = (props) => {
  const { setisModalOpen } = props;
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onClick = () => {
    setisModalOpen(false);
  };

  useEffect(() => {
    document.body.style.cssText = `overflow:hidden`;
    return () => {
      document.body.style.cssText = `overflow:unset`;
    };
  }, []);

  return (
    <ModalOverlay>
      <ModalContainer>
        <div className="clearButton">
          <AiOutlineClose size={20} onClick={onClick}></AiOutlineClose>
        </div>
        <LogoContainer></LogoContainer>
        <FeatureContainer>
          <LoginFeature>
            <Input
              placeholder="이메일"
              name="email"
              value={email}
              onChange={onChangeEmail}
            ></Input>
            <Input
              placeholder="비밀번호"
              name="password"
              value={password}
              isPassword={true}
              onChange={onChangePassword}
            ></Input>
            <LoginButton>
              <LargeButton backgroundColor={colors.blue[0]}>로그인</LargeButton>
            </LoginButton>
          </LoginFeature>
          <ForgotRegisterFeature>
            <span className="forgotRegisterButton">아이디/비밀번호 찾기</span>
            <span className="forgotRegisterButton">회원가입</span>
          </ForgotRegisterFeature>
          <SocialLoginFeature>
            <div className="socialLoginButton">
              <LargeButton color={colors.mono[0]} border={true}>
                구글로 로그인하기
              </LargeButton>
            </div>
            <div className="socialLoginButton">
              <LargeButton color={colors.mono[0]} border={true}>
                애플로 로그인하기
              </LargeButton>
            </div>
            <div className="socialLoginButton">
              <img
                src="kakao_login_medium_wide.png"
                width="280px"
                height="50px"
                alt="kakaoLogin"
              ></img>
            </div>
          </SocialLoginFeature>
        </FeatureContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default LoginModal;
