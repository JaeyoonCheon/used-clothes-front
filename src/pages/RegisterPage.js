import React, { useCallback, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { NonModalLayout } from "../components/layout/ModalLayout";
import colors from "../lib/styles/colors";
import { DefaultInput, Input } from "../components/common/Input";
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

const RegisterFormContainer = styled.form`
  width: 320px;
  height: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 35px;

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
  const [phonenumber, setPhonenumber] = useState("");

  const [usernameMessage, setUsernameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [phonenumberMessage, setPhonenumberMessage] = useState("");

  const [validUsername, setValidUsername] = useState(false);
  const [validemail, setValidEmail] = useState(false);
  const [validpassword, setValidPassword] = useState(false);
  const [validpasswordConfirm, setValidPasswordConfirm] = useState(false);
  const [validphonenumber, setValidPhonenumber] = useState(false);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const noHyphenPhonenumber = phonenumber.replace(/-/g, "");

      try {
        await axios
          // 라우팅 경로 상수화 필요
          .post(
            "http://118.67.142.10/user/create",
            {
              email: email,
              password: password,
              name: username,
              phone: noHyphenPhonenumber,
            },
            { withCredentials: true }
          )
          .then((res) => {
            if (res.status === 200) {
              console.log("Register OK");
            }
          });
      } catch (error) {
        console.log(`${error} occured!`);
      }
    },
    [email, password, username, phonenumber]
  );

  // 디바운싱 추후 적용 필수!

  const onChangeUsername = useCallback((e) => {
    console.log(e.target.value);
    const regex = /[가-힣]/;
    setUsername(e.target.value);

    if (regex.test(e.target.value)) {
      if (e.target.value.length >= 2 && e.target.value.length <= 10) {
        setValidUsername(true);
        setUsernameMessage("");
      } else {
        setValidUsername(false);
        setUsernameMessage("2자 이상 10자 이하로 입력해 주세요");
      }
    } else {
      setValidUsername(false);
      setUsernameMessage("이름은 한글로 입력되어야 합니다");
    }
  }, []);

  const onChangeEmail = useCallback((e) => {
    const regex =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    setEmail(e.target.value);

    if (regex.test(e.target.value)) {
      setValidEmail(true);
      setEmailMessage("");
    } else {
      setValidEmail(false);
      setEmailMessage("올바르지 않은 이메일 형식입니다");
    }
  }, []);
  const onChangePassword = useCallback((e) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$/;
    setPassword(e.target.value);

    if (regex.test(e.target.value)) {
      setValidPassword(true);
      setPasswordMessage("");
    } else {
      setValidPassword(false);
      setPasswordMessage(
        "비밀번호는 8~30자리의 숫자, 영문자, 특수문자 조합으로 구성되어야 합니다"
      );
    }
  }, []);
  const onChangePasswordConfirm = useCallback(
    (e) => {
      setPasswordConfirm(e.target.value);

      if (e.target.value === password) {
        setValidPasswordConfirm(true);
        setPasswordConfirmMessage("");
      } else {
        setValidPasswordConfirm(false);
        setPasswordConfirmMessage("비밀번호가 일치하지 않습니다");
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
          <h2 className="title">회원가입</h2>
          <AiOutlineArrowLeft size={21.33}></AiOutlineArrowLeft>
        </TitleContainer>
        <RegisterFormContainer onSubmit={onSubmit}>
          <DefaultInput
            placeholder="이름"
            value={username}
            onChange={onChangeUsername}
          ></DefaultInput>
          {!validUsername && <div>{usernameMessage}</div>}
          <DefaultInput
            placeholder="이메일"
            value={email}
            onChange={onChangeEmail}
          ></DefaultInput>
          {!validemail && <div>{emailMessage}</div>}
          <div className="redundancyCheck">
            <SmallButton isFilled={true} colorTheme={colors.blue[0]}>
              중복체크
            </SmallButton>
          </div>
          <DefaultInput
            placeholder="비밀번호"
            value={password}
            isPassword={true}
            onChange={onChangePassword}
          ></DefaultInput>
          {!validpassword && <div>{passwordMessage}</div>}
          <DefaultInput
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            isPassword={true}
            onChange={onChangePasswordConfirm}
          ></DefaultInput>
          {!validpasswordConfirm && <div>{passwordConfirmMessage}</div>}
          <DefaultInput
            placeholder="휴대폰 번호"
            value={phonenumber}
            onChange={onChangePhonenumber}
          ></DefaultInput>
          {!validphonenumber && <div>{phonenumberMessage}</div>}
          <div className="confirmButton">
            <LargeButton isFilled={true} colorTheme={colors.blue[0]}>
              회원가입
            </LargeButton>
          </div>
        </RegisterFormContainer>
      </ContentContainer>
    </NonModalLayout>
  );
};

export default RegisterPage;
