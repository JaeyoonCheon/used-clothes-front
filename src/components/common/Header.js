import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

import colors from "../../lib/styles/colors";
import Searchbar from "./Searchbar";
import Portal from "../../lib/portal";
import LoginModal from "../modal/LoginModal";
import { logout } from "../../slices/authSlice";

const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;

  z-index: 100;
`;

const TopHeader = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1180px 1fr;

  background-color: white;
  border-bottom: 0.3px solid ${colors.mono[1]};
  z-index: 999;
`;

const TopNavbar = styled.div`
  grid-column: 2/3;
  width: 1180px;
  height: 25px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  .top_nav_menu {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: right;

    .top_nav_clicker {
      margin-left: 5px;

      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      color: ${colors.mono[0]};

      cursor: pointer;
    }
  }
`;

const HeaderBox = styled.div`
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
  color: black;
`;

const NavMenu = styled.div`
  .menu {
    margin-left: 18px;

    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: ${colors.mono[0]};

    cursor: pointer;
  }
`;

const HeaderSpacer = styled.div`
  height: 109px;
`;

const Header = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setisModalOpen] = useState(false);
  const onClickLogin = () => {
    setisModalOpen(true);
  };
  const onClickLogout = () => {
    dispatch(logout());
    setisModalOpen(false);
  };
  const { email: currentUser } = useSelector((state) => ({
    email: state.auth.auth,
  }));
  return (
    <>
      <HeaderContainer>
        <TopHeader>
          <TopNavbar>
            {currentUser ? (
              <div className="top_nav_menu">
                <span className="top_nav_clicker" onClick={onClickLogout}>
                  로그아웃
                </span>
                <span className="top_nav_clicker">알림</span>
                <span className="top_nav_clicker">
                  <Link to="/mypage">마이페이지</Link>
                </span>
              </div>
            ) : (
              <div className="top_nav_menu">
                <span className="top_nav_clicker" onClick={onClickLogin}>
                  로그인
                </span>
                {isModalOpen && (
                  <Portal>
                    <LoginModal setisModalOpen={setisModalOpen}></LoginModal>
                  </Portal>
                )}
                <Link to="/register" className="top_nav_clicker">
                  <span>회원가입</span>
                </Link>
                <span className="top_nav_clicker">알림</span>
                <Link to="/mypage" className="top_nav_clicker">
                  <span>마이페이지</span>
                </Link>
              </div>
            )}
          </TopNavbar>
        </TopHeader>
        <HeaderBox>
          <Wrapper>
            <Logo>
              <Link to="/">중고의류</Link>
            </Logo>
            <Searchbar></Searchbar>
            <NavMenu>
              <Link to="/additem" className="menu">
                <span>상품등록</span>
              </Link>
              <span className="menu">최근 본 상품</span>
              <Link to="/myproduct" className="menu">
                <span>내 상품</span>
              </Link>
            </NavMenu>
          </Wrapper>
        </HeaderBox>
      </HeaderContainer>
      <HeaderSpacer></HeaderSpacer>
    </>
  );
};

export default Header;
