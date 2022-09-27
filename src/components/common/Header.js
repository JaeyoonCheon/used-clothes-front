import React from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";
import Searchbar from "./Searchbar";

const HeaderBox = styled.div`
  position: fixed;
  width: 100%;
  background-color: white;
  font-family: "Noto Serif";
  border-bottom: 0.3px solid ${colors.mono[1]};
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
  }
`;

const HeaderSpacer = styled.div`
  height: 84px;
`;

const Header = () => {
  return (
    <>
      <HeaderBox>
        <Wrapper>
          <Logo>Title</Logo>
          <Searchbar></Searchbar>
          <NavMenu>
            <span className="menu">로그인</span>
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
