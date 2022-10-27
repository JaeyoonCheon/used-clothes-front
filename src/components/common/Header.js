import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import colors from "../../lib/styles/colors";
import Searchbar from "./Searchbar";
import LoginModal from "../modal/LoginModal";

const HeaderBox = styled.div`
  position: fixed;
  width: 100%;
  background-color: white;
  border-bottom: 0.3px solid ${colors.mono[1]};
  z-index: 99;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 1180px;
  height: 84px;
  align-items: center;
  justify-content: space-between;

  .searchbar {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;

const Logo = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${colors.blue[0]};
`;

const NavMenu = styled.div`
  .menu {
    font-weight: 100;
    font-size: 16px;
    margin-left: 18px;
    color: ${colors.mono[0]};

    cursor: pointer;
  }
`;

const HeaderSpacer = styled.div`
  height: 84px;
`;

const Header = () => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const onClickLogin = () => {
    setisModalOpen(true);
  };
  return (
    <>
      <HeaderBox>
        <Wrapper>
          <Logo>
            <Link to="/">Title</Link>
          </Logo>
          <Searchbar></Searchbar>
          <NavMenu>
            <span className="menu" onClick={onClickLogin}>
              로그인
            </span>
            {isModalOpen && (
              <LoginModal setisModalOpen={setisModalOpen}></LoginModal>
            )}
            <span className="menu">상품등록</span>
            <span className="menu">내 상품</span>
          </NavMenu>
        </Wrapper>
      </HeaderBox>
      <HeaderSpacer></HeaderSpacer>
    </>
  );
};

export default Header;
