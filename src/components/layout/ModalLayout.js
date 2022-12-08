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
  z-index: 199;

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

const DefaultWrapper = styled.div`
  position: absolute;
  width: 400px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;

  background: white;
  border: ${(props) => props.border && `0.5px solid ${colors.mono[0]}`};

  .clearButton {
    display: flex;
    justify-content: flex-end;

    cursor: pointer;
  }
`;

const BrandWrapper = styled.div`
  width: 800px;
  height: 600px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background: white;
  border: 0.5px solid ${colors.mono[0]};
  .clearButton {
    display: flex;
    justify-content: flex-end;

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
      <DefaultWrapper>{children}</DefaultWrapper>
    </ModalOverlay>
  );
};

export const NonOverlayModalLayout = (props) => {
  const { children } = props;

  return <DefaultWrapper border={true}>{children}</DefaultWrapper>;
};

export const NonModalLayout = (props) => {
  const { children } = props;

  return (
    <NonModalBackground>
      <DefaultWrapper>{children}</DefaultWrapper>
    </NonModalBackground>
  );
};

export const BrandModalLayout = (props) => {
  const { children } = props;

  return <BrandWrapper>{children}</BrandWrapper>;
};
