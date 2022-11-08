import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import { ModalLayout } from "../layout/ModalLayout";
import colors from "../../lib/styles/colors";
import { LargeButton } from "../common/Button";
import { DefaultInput } from "../common/Input";
import useInput from "../../hooks/useInput";
import { loginAPI } from "../../lib/api/user";

const ContentContainer = styled.div`
  width: 320px;
  margin: 40px auto 30px auto;
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
    letter-spacing: -0.05em;
  }
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

  .account_button {
    margin-left: 15px;

    font-size: 12px;
    cursor: pointer;

    .link {
      color: inherit;
      text-decoration: none;
    }
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
      <ContentContainer>
        <div className="clearButton">
          <AiOutlineClose size={20} onClick={onClick}></AiOutlineClose>
        </div>
        <TitleContainer>
          <h2 className="title">로그인</h2>
        </TitleContainer>
        <LoginFeature onSubmit={fetchLogin}>
          <DefaultInput
            placeholder="이메일"
            name="email"
            value={email}
            onChange={onChangeEmail}
          ></DefaultInput>
          <DefaultInput
            placeholder="비밀번호"
            name="password"
            value={password}
            onChange={onChangePassword}
          ></DefaultInput>
          <LoginButton>
            <LargeButton
              type="submit"
              isFilled={true}
              colorTheme={colors.blue[0]}
            >
              로그인
            </LargeButton>
          </LoginButton>
        </LoginFeature>
        <ForgotRegisterFeature>
          <span className="account_button">
            <Link to="idforgot" className="link">
              <span>아이디</span>
            </Link>
            /
            <Link to="pwforgot" className="link">
              <span>비밀번호 찾기</span>
            </Link>
          </span>
          <span className="account_button">
            <Link to="register" className="link">
              <span>회원가입</span>
            </Link>
          </span>
        </ForgotRegisterFeature>
        <SocialLoginFeature>
          <div className="socialLoginButton">
            <LargeButton
              isFilled={false}
              colorTheme={colors.mono[1]}
              icon="Google_Logo"
            >
              구글로 로그인하기
            </LargeButton>
          </div>
          <div className="socialLoginButton">
            <LargeButton
              isFilled={false}
              colorTheme={colors.mono[1]}
              icon="Apple_Logo"
            >
              애플로 로그인하기
            </LargeButton>
          </div>
          <div className="socialLoginButton">
            <LargeButton
              isFilled={true}
              colorTheme={colors.kakao[0]}
              fontColor={colors.kakao[1]}
              icon="Kakao_Logo"
            >
              카카오로 로그인하기
            </LargeButton>
          </div>
        </SocialLoginFeature>
      </ContentContainer>
    </ModalLayout>
  );
};

export default LoginModal;
