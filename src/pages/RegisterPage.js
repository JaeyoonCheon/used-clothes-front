import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";

import { registerAPI } from "../lib/api/user";
import { NonModalLayout } from "../components/layout/ModalLayout";
import colors from "../lib/styles/colors";
import { DefaultInput, PasswordInput } from "../components/common/Input";
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

  const mutation = useMutation(
    registerAPI({
      username,
      email,
      password,
      phonenumber: noHyphenPhonenumber,
    })
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    console.log(mutation);

    if (mutation.isSuccess) {
      alert("회원가입이 완료되었습니다!");
      navigate("/welcome");
    }
    if (mutation.error) {
      alert("회원가입에 필요한 정보를 모두 작성해주세요!");
      navigate("/register");
    }
  };

  // 디바운싱 추후 적용 필수!

  const onChangeUsername = useCallback((e) => {
    console.log(e.target.value);
    const regex = /[가-힣]/;
    setUsername(e.target.value);

    if (regex.test(e.target.value)) {
      if (e.target.value.length >= 2 && e.target.value.length <= 10) {
        setUsernameMessage("");
      } else {
        setUsernameMessage("2자 이상 10자 이하로 입력해 주세요.");
      }
    } else {
      setUsernameMessage("이름은 한글로 입력되어야 합니다.");
    }
  }, []);

  const onChangeEmail = useCallback((e) => {
    const regex =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    setEmail(e.target.value);

    if (regex.test(e.target.value)) {
      setEmailMessage("");
    } else {
      setEmailMessage("올바르지 않은 이메일 형식입니다.");
    }
  }, []);
  const onChangePassword = useCallback((e) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$/;
    setPassword(e.target.value);

    if (regex.test(e.target.value)) {
      setPasswordMessage("");
    } else {
      setPasswordMessage(
        "8~30자리의 숫자, 영문자, 특수문자 조합으로 구성되어야 합니다."
      );
    }
  }, []);
  const onChangePasswordConfirm = useCallback(
    (e) => {
      setPasswordConfirm(e.target.value);

      if (e.target.value === password) {
        setPasswordConfirmMessage("");
      } else {
        setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
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
          <AiOutlineArrowLeft
            size={21.33}
            onClick={() => {
              navigate(-1);
            }}
          ></AiOutlineArrowLeft>
        </TitleContainer>
        <RegisterFormContainer onSubmit={onSubmit}>
          <DefaultInput
            placeholder="이름"
            value={username}
            name="username"
            onChange={onChangeUsername}
            errorMsg={usernameMessage}
          ></DefaultInput>
          <DefaultInput
            placeholder="이메일"
            value={email}
            name="email"
            onChange={onChangeEmail}
            errorMsg={emailMessage}
          ></DefaultInput>
          <div className="redundancyCheck">
            <SmallButton isFilled={true} colorTheme={colors.blue[0]}>
              중복체크
            </SmallButton>
          </div>
          <PasswordInput
            placeholder="비밀번호"
            value={password}
            name="password"
            isPassword={true}
            onChange={onChangePassword}
            errorMsg={passwordMessage}
          ></PasswordInput>
          <PasswordInput
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            name="passwordConfirm"
            isPassword={true}
            onChange={onChangePasswordConfirm}
            errorMsg={passwordConfirmMessage}
          ></PasswordInput>
          <DefaultInput
            placeholder="휴대폰 번호"
            value={phonenumber}
            name="phonenumber"
            onChange={onChangePhonenumber}
            errorMsg={phonenumberMessage}
          ></DefaultInput>
          <div className="confirmButton">
            <LargeButton
              isFilled={true}
              colorTheme={colors.blue[0]}
              type="submit"
            >
              회원가입
            </LargeButton>
          </div>
        </RegisterFormContainer>
      </ContentContainer>
    </NonModalLayout>
  );
};

export default RegisterPage;
