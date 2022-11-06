import React from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";

const ButtonWrapper = styled.button`
  padding: 0;
  display: grid;
  align-items: center;
  justify-content: center;

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
      return "black";
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
`;

const SmallButtonContainer = styled(ButtonWrapper)`
  width: 80px;
  height: 30px;
`;

const FreeSizeButtonContainer = styled(ButtonWrapper)`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
`;

const SquareButtonContainer = styled.button`
  width: 100px;
  height: auto;

  border: 0.3px solid ${colors.mono[1]};
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  color: ${colors.mono[0]};
  background: white;

  cursor: pointer;
`;

export const LargeButton = (props) => {
  const { children, icon, isFilled, colorTheme, fontColor } = props;
  return (
    <LargeButtonContainer
      isFilled={isFilled}
      colorTheme={colorTheme}
      fontColor={fontColor}
    >
      {icon && (
        <img className="icon" src={`${icon}.svg`} alt="button_icon"></img>
      )}
      <p className="button_label">{children}</p>
    </LargeButtonContainer>
  );
};

export const MiddleButton = (props) => {
  const { children, icon, isFilled, colorTheme } = props;
  return (
    <MiddleButtonContainer isFilled={isFilled} colorTheme={colorTheme}>
      {icon}
      {children}
    </MiddleButtonContainer>
  );
};

export const SmallButton = (props) => {
  const { children, icon, isFilled, colorTheme } = props;
  return (
    <SmallButtonContainer isFilled={isFilled} colorTheme={colorTheme}>
      {icon}
      {children}
    </SmallButtonContainer>
  );
};

export const Button = (props) => {
  const {
    children,
    width,
    height,
    icon,
    backgroundColor,
    color,
    border = false,
    fontSize,
  } = props;
  return (
    <FreeSizeButtonContainer
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      color={color}
      border={border && `0.3px solid ${colors.mono[1]}`}
      fontSize={fontSize}
    >
      {icon !== undefined && icon}
      {children}
    </FreeSizeButtonContainer>
  );
};

export const SquareButton = (props) => {
  const { onClick } = props;

  return (
    <SquareButtonContainer onClick={onClick}>더 보기 +</SquareButtonContainer>
  );
};
