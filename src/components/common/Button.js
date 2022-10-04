import React from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";

const ButtonContainer = styled.div`
  width: 280px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${(props) => props.backgroundColor || "white"};
  border: ${(props) => props.border || "none"};
  border-radius: 10px;
  color: ${(props) => props.color || "white"};
  font-family: "Noto Serif";
  font-style: normal;
  font-size: 16px;

  cursor: pointer;
`;

export const LargeButton = (props) => {
  const { children, icon, backgroundColor, color, border = false } = props;
  console.log(border);
  return (
    <ButtonContainer
      backgroundColor={backgroundColor}
      color={color}
      border={border && `0.3px solid ${colors.mono[1]}`}
    >
      {icon !== undefined && icon}
      {children}
    </ButtonContainer>
  );
};
