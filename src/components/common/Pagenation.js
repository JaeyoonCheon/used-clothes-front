import React from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";

const PagenationContainer = styled.div`
  width: 100%;
`;

const PagenationButtonContainer = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  [id^="button-"] {
    padding: 0;
    display: flex;
    justify-items: center;
    margin: 8px;
    font-family: "Noto Sans KR";
    font-weight: 400;
    font-size: 20px;

    [id$="current"] {
      color: ${colors.blue[0]};
    }
  }
`;

const Pagenation = (props) => {
  const { currentPage, pageCount, limit } = props;

  const pageUnitNum = Math.floor(currentPage / pageCount);
  const end =
    pageCount * (pageUnitNum + 1) <= limit
      ? pageCount * (pageUnitNum + 1)
      : limit;
  const pages = [...Array(pageCount)].map(
    (v, i) => i + 1 + pageUnitNum * pageCount
  );

  return (
    <PagenationContainer>
      <PagenationButtonContainer>
        {currentPage >= pageCount && <ul className="button">&laquo;</ul>}
        {currentPage >= pageCount && <ul className="button">&lt;</ul>}
        {pages.map((page, i) => {
          const isCurrent = page === currentPage ? "current" : "others";
          return (
            <ul className={`button-${isCurrent}`} key={i}>
              {page}
            </ul>
          );
        })}
        {end < limit && <ul className="button">&gt;</ul>}
        {end < limit && <ul className="button">&raquo;</ul>}
      </PagenationButtonContainer>
    </PagenationContainer>
  );
};

export default Pagenation;
