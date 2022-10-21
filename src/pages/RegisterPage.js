import React, { useCallback, useState } from "react";
import styled from "styled-components";
import axios from "axios";

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

const RegisterContainer = styled.div`
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

const RegisterFormContainer = styled.form`
  width: 280px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

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
  const [phoneNumber, setPhoneNumber] = useState("");

  const [usernameMessage, setUsernameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [phoneNumberMessage, setPhoneNumberMessage] = useState("");

  const [validUsername, setValidUsername] = useState(false);
  const [validemail, setValidEmail] = useState(false);
  const [validpassword, setValidPassword] = useState(false);
  const [validpasswordConfirm, setValidPasswordConfirm] = useState(false);
  const [validphoneNumber, setValidPhoneNumber] = useState(false);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        await axios
          // 라우팅 경로 상수화 필요
          .post("/user/create", {
            email: email,
            password: password,
            name: username,
            phone: phoneNumber,
          })
          .then((res) => {
            if (res.status === 200) {
              console.log("Register OK");
            }
          });
      } catch (error) {
        console.log(`${error} occured!`);
      }
    },
    [email, password, username, phoneNumber]
  );

  const onChangeUsername = useCallback((e) => {
    const regex = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]$/;
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

  const onChangeEmail = (e) => {
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
  };

  const onChangePassword = (e) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$/;
    setPassword(e.target.value);

    if (regex.test(e.target.value)) {
      setValidEmail(true);
      setPasswordMessage("");
    } else {
      setValidEmail(false);
      setPasswordMessage(
        "비밀번호는 8~30자리의 숫자, 영문자, 특수문자 조합으로 구성되어야 합니다"
      );
    }
  };
  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);

    if (e.target.value === password) {
      setValidPasswordConfirm(true);
      setPasswordConfirmMessage("");
    } else {
      setValidPasswordConfirm(false);
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다");
    }
  };
  const onChangePhoneNumber = (e) => {
    const autoHyphen = (number) => {
      return number
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    };
    setPhoneNumber(autoHyphen(e.target.value));
  };

  return (
    <Wrapper>
      <RegisterContainer>
        <Spacer></Spacer>
        <RegisterFormContainer onSubmit={onSubmit}>
          <Input
            placeholder="이름"
            value={username}
            onChange={onChangeUsername}
          ></Input>
          {!validUsername && <div>{usernameMessage}</div>}
          <Input
            placeholder="이메일"
            value={email}
            onChange={onChangeEmail}
          ></Input>
          {!validemail && <div>{emailMessage}</div>}
          <div className="redundancyCheck">
            <SmallButton backgroundColor={colors.blue[0]}>중복체크</SmallButton>
          </div>
          <Input
            placeholder="비밀번호"
            value={password}
            onChange={onChangePassword}
          ></Input>
          {!validpassword && <div>{passwordMessage}</div>}
          <Input
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
          ></Input>
          {!validpasswordConfirm && <div>{passwordConfirmMessage}</div>}
          <Input
            placeholder="휴대폰 번호"
            value={phoneNumber}
            onChange={onChangePhoneNumber}
          ></Input>
          {!validphoneNumber && <div>{phoneNumberMessage}</div>}
          <div className="confirmButton">
            <LargeButton backgroundColor={colors.blue[0]}>회원가입</LargeButton>
          </div>
        </RegisterFormContainer>
      </RegisterContainer>
    </Wrapper>
  );
};

export default RegisterPage;
