import React from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";

const ButtonWrapper = styled.button`
  padding: 0;
  display: grid;
  align-items: center;
  justify-content: center;

  font-family: Pretendard;
  background: ${(props) => (props.isFilled ? props.colorTheme : "white")};
  border: ${(props) =>
    props.isFilled ? "none" : `0.3px solid ${props.colorTheme}`};
  border-radius: 10px;
  color: ${(props) => {
    if (props.isFilled) {
      if (props.fontColor) {
        return `${props.fontColor}`;
      } else {
        return "white";
      }
    } else {
      if (props.fontColor) {
        return `${props.fontColor}`;
      } else {
        return "black";
      }
    }
  }};

  cursor: pointer;
`;

const LargeButtonContainer = styled(ButtonWrapper)`
  grid-template-columns: 1fr 5fr 1fr;
  width: 320px;
  height: 50px;

  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.05em;

  .icon {
    grid-column: 1/2;
    margin-left: 7px;
    width: 36px;
    height: 36px;
  }
  .button_label {
    grid-column: 2/2;
  }
`;

const MiddleButtonContainer = styled(ButtonWrapper)`
  width: 180px;
  height: 60px;

  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
`;

const SmallButtonContainer = styled(ButtonWrapper)`
  width: 80px;
  height: 30px;
  border-radius: 5px;

  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
`;

const AnotherButtonContainer = styled(ButtonWrapper)`
  width: 100px;
  height: 50px;
`;

export const LargeButton = (props) => {
  const { children, icon, isFilled, colorTheme, fontColor, ...restProps } =
    props;
  return (
    <LargeButtonContainer
      isFilled={isFilled}
      colorTheme={colorTheme}
      fontColor={fontColor}
      type={restProps.type}
    >
      {icon && (
        <img className="icon" src={`${icon}.svg`} alt="button_icon"></img>
      )}
      <p className="button_label">{children}</p>
    </LargeButtonContainer>
  );
};

export const MiddleButton = (props) => {
  const { children, icon, isFilled, colorTheme, fontColor, ...restProps } =
    props;
  return (
    <MiddleButtonContainer
      isFilled={isFilled}
      colorTheme={colorTheme}
      fontColor={fontColor}
      type={restProps.type}
      {...restProps}
    >
      {icon}
      {children}
    </MiddleButtonContainer>
  );
};

export const SmallButton = (props) => {
  const { children, icon, isFilled, colorTheme, fontColor, ...restProps } =
    props;
  return (
    <SmallButtonContainer
      isFilled={isFilled}
      colorTheme={colorTheme}
      fontColor={fontColor}
      type={restProps.type}
    >
      {icon}
      {children}
    </SmallButtonContainer>
  );
};

export const AnotherButton = (props) => {
  const { children, icon, isFilled, colorTheme } = props;
  return (
    <AnotherButtonContainer isFilled={isFilled} colorTheme={colorTheme}>
      {icon}
      {children}
    </AnotherButtonContainer>
  );
};
