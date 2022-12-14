import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";

import { registerAPI } from "../lib/api/user";
import { NonModalLayout } from "../components/layout/ModalLayout";
import colors from "../lib/styles/colors";
import { LabelInput, LabelPasswordInput } from "../components/common/Input";
import { LargeButton, SmallButton } from "../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../slices/authSlice";

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

const RegisterFormContainer = styled.form`
  width: 320px;
  height: 450px;
  display: flex;
  flex-direction: column;
  margin-top: 35px;

  .confirmButton {
    margin-top: auto;
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
  const [phonenumber, setPhonenumber] = useState("");

  const [usernameMessage, setUsernameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [phonenumberMessage, setPhonenumberMessage] = useState("");

  const noHyphenPhonenumber = phonenumber.replace(/-/g, "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { auth, authError } = useSelector((state) => ({
    auth: state.auth.auth,
    authError: state.auth.authError,
  }));

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");

    if (
      !usernameMessage &&
      !emailMessage &&
      !passwordMessage &&
      !passwordConfirmMessage &&
      !phonenumberMessage
    ) {
      dispatch(
        register({
          email,
          name: username,
          password,
          phone: phonenumber,
        })
      );
    } else {
      alert("???????????? ????????? ?????? ????????? ?????????!");
    }
  };

  useEffect(() => {
    if (authError) {
      console.log("???????????? ??????");
      console.log(authError);
      return;
    }
    if (auth) {
      console.log("???????????? ??????");
      console.log(auth);
      navigate("/");
    }
  }, [auth, authError, navigate]);

  // ???????????? ?????? ?????? ??????!

  const onChangeUsername = useCallback((e) => {
    console.log(e.target.value);
    const regex = /[???-???]/;
    setUsername(e.target.value);

    if (regex.test(e.target.value)) {
      if (e.target.value.length >= 2 && e.target.value.length <= 10) {
        setUsernameMessage("");
      } else {
        setUsernameMessage("2??? ?????? 10??? ????????? ????????? ?????????.");
      }
    } else {
      setUsernameMessage("????????? ????????? ??????????????? ?????????.");
    }
  }, []);
  const onChangeEmail = useCallback((e) => {
    const regex =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    setEmail(e.target.value);

    if (regex.test(e.target.value)) {
      setEmailMessage("");
    } else {
      setEmailMessage("???????????? ?????? ????????? ???????????????.");
    }
  }, []);
  const onChangePassword = useCallback((e) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$/;
    setPassword(e.target.value);

    if (regex.test(e.target.value)) {
      setPasswordMessage("");
    } else {
      setPasswordMessage(
        "8~30????????? ??????, ?????????, ???????????? ???????????? ??????????????? ?????????."
      );
    }
  }, []);
  const onChangePasswordConfirm = useCallback(
    (e) => {
      setPasswordConfirm(e.target.value);

      if (e.target.value === password) {
        setPasswordConfirmMessage("");
      } else {
        setPasswordConfirmMessage("??????????????? ???????????? ????????????.");
      }
    },
    [password]
  );
  const onChangePhonenumber = useCallback((e) => {
    const setAutoHyphen = (number) => {
      return number
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    };
    setPhonenumber(setAutoHyphen(e.target.value));
  }, []);

  return (
    <NonModalLayout>
      <ContentContainer>
        <TitleContainer>
          <h2 className="title">????????????</h2>
          <div className="clearButton">
            <AiOutlineArrowLeft
              size={21.33}
              onClick={() => {
                navigate(-1);
              }}
            ></AiOutlineArrowLeft>
          </div>
        </TitleContainer>
        <RegisterFormContainer onSubmit={onSubmit}>
          <LabelInput
            placeholder="??????"
            value={username}
            name="username"
            onChange={onChangeUsername}
            errorMsg={usernameMessage}
          ></LabelInput>
          <LabelInput
            placeholder="?????????"
            value={email}
            name="email"
            onChange={onChangeEmail}
            errorMsg={emailMessage}
          ></LabelInput>
          <div className="redundancyCheck">
            <SmallButton isFilled={true} colorTheme={colors.blue[0]}>
              ????????????
            </SmallButton>
          </div>
          <LabelPasswordInput
            placeholder="????????????"
            value={password}
            name="password"
            isPassword={true}
            onChange={onChangePassword}
            errorMsg={passwordMessage}
          ></LabelPasswordInput>
          <LabelPasswordInput
            placeholder="???????????? ??????"
            value={passwordConfirm}
            name="passwordConfirm"
            isPassword={true}
            onChange={onChangePasswordConfirm}
            errorMsg={passwordConfirmMessage}
          ></LabelPasswordInput>
          <LabelInput
            placeholder="????????? ??????"
            value={phonenumber}
            name="phonenumber"
            onChange={onChangePhonenumber}
            errorMsg={phonenumberMessage}
          ></LabelInput>
          <div className="confirmButton">
            <LargeButton
              isFilled={true}
              colorTheme={colors.blue[0]}
              type="submit"
            >
              ????????????
            </LargeButton>
          </div>
        </RegisterFormContainer>
      </ContentContainer>
    </NonModalLayout>
  );
};

export default RegisterPage;
