import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

import { ModalLayout } from "../layout/ModalLayout";
import colors from "../../lib/styles/colors";
import { LargeButton } from "../common/Button";
import { NonHookInput, NonHookPasswordInput } from "../common/Input";
import useInput from "../../hooks/useInput";
import { login } from "../../slices/authSlice";

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
  .clear_button {
    margin-left: auto;
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

  const dispatch = useDispatch();
  const { auth, authError } = useSelector((state) => ({
    auth: state.auth.auth,
    authError: state.auth.authError,
  }));

  const onClickModalToggle = () => {
    setisModalOpen(false);
  };

  // bcrypt ????????? ?????? ??????.
  const fetchLogin = (e) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };

  useEffect(() => {
    document.body.style.cssText = `overflow:hidden`;
    return () => {
      document.body.style.cssText = `overflow:unset`;
    };
  }, []);
  useEffect(() => {
    if (authError) {
      console.log("Login Error!");
      console.log(authError);
      return;
    }
    if (auth) {
      console.log("Login Success");
      window.sessionStorage.setItem("currentUser", auth);
      setisModalOpen(false);
    }
  }, [auth, authError, setisModalOpen]);

  return (
    <ModalLayout onClick={onClickModalToggle}>
      <ContentContainer>
        <TitleContainer>
          <h2 className="title">?????????</h2>
          <div className="clearButton">
            <AiOutlineClose
              size={25}
              onClick={onClickModalToggle}
            ></AiOutlineClose>
          </div>
        </TitleContainer>
        <LoginFeature onSubmit={fetchLogin}>
          <NonHookInput
            placeholder="?????????"
            name="email"
            value={email}
            onChange={onChangeEmail}
          ></NonHookInput>
          <NonHookPasswordInput
            placeholder="????????????"
            name="password"
            value={password}
            onChange={onChangePassword}
          ></NonHookPasswordInput>
          <LoginButton>
            <LargeButton
              type="submit"
              isFilled={true}
              colorTheme={colors.blue[0]}
            >
              ?????????
            </LargeButton>
          </LoginButton>
        </LoginFeature>
        <ForgotRegisterFeature>
          <span className="account_button">
            <Link to="idforgot" className="link">
              <span>?????????</span>
            </Link>
            /
            <Link to="pwforgot" className="link">
              <span>???????????? ??????</span>
            </Link>
          </span>
          <span className="account_button">
            <Link to="register" className="link">
              <span>????????????</span>
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
              ????????? ???????????????
            </LargeButton>
          </div>
          <div className="socialLoginButton">
            <LargeButton
              isFilled={false}
              colorTheme={colors.mono[1]}
              icon="Apple_Logo"
            >
              ????????? ???????????????
            </LargeButton>
          </div>
          <div className="socialLoginButton">
            <LargeButton
              isFilled={true}
              colorTheme={colors.kakao[0]}
              fontColor={colors.kakao[1]}
              icon="Kakao_Logo"
            >
              ???????????? ???????????????
            </LargeButton>
          </div>
        </SocialLoginFeature>
      </ContentContainer>
    </ModalLayout>
  );
};

export default LoginModal;
