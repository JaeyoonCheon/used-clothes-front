import React, { useEffect } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

import { ModalLayout } from "../layout/ModalLayout";
import colors from "../../lib/styles/colors";
import { LargeButton } from "../common/Button";
import { Input } from "../common/Input";
import useInput from "../../hooks/useInput";
import { loginAPI } from "../../lib/api/user";

const ContentContainer = styled.div`
  width: 320px;
  margin: 40px auto 30px auto;
`;

const LogoContainer = styled.h2`
  margin: 0;
  height: 60px;

  font-weight: 400;
  font-style: initial;
  font-size: 32px;
  line-height: 38px;
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

  // bcrypt 암호화 진행 예정.
  const fetchLogin = () => {
    const fetchResponse = loginAPI({ email, password });

    if (fetchResponse) {
      setisModalOpen(false);
    }
  };

  useEffect(() => {
    document.body.style.cssText = `overflow:hidden`;
    return () => {
      document.body.style.cssText = `overflow:unset`;
    };
  }, []);

  return (
    <ModalLayout onClick={onClick}>
      <div className="clearButton">
        <AiOutlineClose size={20} onClick={onClick}></AiOutlineClose>
      </div>
      <ContentContainer>
        <LogoContainer>로그인</LogoContainer>
        <LoginFeature onSubmit={fetchLogin}>
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
            <LargeButton type="submit" backgroundColor={colors.blue[0]}>
              로그인
            </LargeButton>
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
      </ContentContainer>
    </ModalLayout>
  );
};

export default LoginModal;
