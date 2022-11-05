import React from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";

const ModalOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;

  background: rgba(0, 0, 0, 0.6);
`;

const NonModalBackground = styled.div`
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

const Wrapper = styled.div`
  position: absolute;
  width: 400px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background: white;

  .clearButton {
    display: flex;
    justify-content: flex-end;
    margin: 5px;

    color: ${colors.mono[0]};

    cursor: pointer;
  }
`;

export const ModalLayout = (props) => {
  const { children, onClick } = props;

  return (
    <ModalOverlay
      className="overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClick();
        }
      }}
    >
      <Wrapper className="wrapper">{children}</Wrapper>
    </ModalOverlay>
  );
};

export const NonModalLayout = (props) => {
  const { children } = props;

  return (
    <NonModalBackground>
      <Wrapper>{children}</Wrapper>
    </NonModalBackground>
  );
};
