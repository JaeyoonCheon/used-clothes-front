import React from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";

const ButtionContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${(props) => props.backgroundColor || "white"};
  border: ${(props) => props.border || "none"};
  border-radius: 20px;
  color: ${(props) => props.color || "white"};
  font-style: normal;
  font-size: 16px;
  line-height: 20px;

  cursor: pointer;
`;

const LargeButtonContainer = styled(ButtionContainer)`
  width: 280px;
  height: 50px;
`;

const MiddleButtonContainer = styled(ButtionContainer)`
  width: 180px;
  height: 60px;
`;

const SmallButtonContainer = styled(ButtionContainer)`
  width: 60px;
  height: 20px;
`;

const FreeSizeButtonContainer = styled(ButtionContainer)`
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
  const { children, icon, backgroundColor, color, border = false } = props;
  return (
    <LargeButtonContainer
      backgroundColor={backgroundColor}
      color={color}
      border={border && `0.3px solid ${colors.mono[1]}`}
    >
      {icon !== undefined && icon}
      {children}
    </LargeButtonContainer>
  );
};

export const MiddleButton = (props) => {
  const { children, icon, backgroundColor, color, border = false } = props;
  return (
    <MiddleButtonContainer
      backgroundColor={backgroundColor}
      color={color}
      border={border && `0.3px solid ${colors.mono[1]}`}
    >
      {icon !== undefined && icon}
      {children}
    </MiddleButtonContainer>
  );
};

export const SmallButton = (props) => {
  const { children, icon, backgroundColor, color, border = false } = props;
  return (
    <SmallButtonContainer
      backgroundColor={backgroundColor}
      color={color}
      border={border && `0.3px solid ${colors.mono[1]}`}
    >
      {icon !== undefined && icon}
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
