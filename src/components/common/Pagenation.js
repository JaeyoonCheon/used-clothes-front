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

  ul[class^="button"] {
    padding: 8px;
    display: flex;
    justify-items: center;
    margin-left: 10px;
    font-family: "Noto Sans KR";
    font-weight: 400;
    font-size: 20px;

    cursor: pointer;

    &[class$="current"] {
      color: ${colors.blue[0]};
    }
  }
`;

const Pagenation = (props) => {
  const { currentPage, pageCount, limit, setCurrentPage } = props;

  const pageUnitNum = Math.floor((currentPage - 1) / pageCount);
  const end =
    pageCount * (pageUnitNum + 1) <= limit
      ? pageCount * (pageUnitNum + 1)
      : limit;
  const pages = [...Array(pageCount)].map(
    (v, i) => i + 1 + pageUnitNum * pageCount
  );

  console.log(
    `Current Page : ${currentPage} / pageCount : ${pageCount} / pageUnitNum : ${pageUnitNum}`
  );

  return (
    <PagenationContainer>
      <PagenationButtonContainer>
        {currentPage > pageCount && (
          <ul
            className="button"
            onClick={() => setCurrentPage(pageUnitNum * pageCount)}
          >
            &laquo;
          </ul>
        )}
        {currentPage > pageCount && (
          <ul
            className="button"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            &lt;
          </ul>
        )}
        {pages.map((page, i) => {
          const isCurrent = page === currentPage ? "current" : "others";
          return (
            <ul
              className={`button-${isCurrent}`}
              key={i}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </ul>
          );
        })}
        {end < limit && (
          <ul
            className="button"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            &gt;
          </ul>
        )}
        {end < limit && (
          <ul
            className="button"
            onClick={() => setCurrentPage((pageUnitNum + 1) * pageCount + 1)}
          >
            &raquo;
          </ul>
        )}
      </PagenationButtonContainer>
    </PagenationContainer>
  );
};

export default Pagenation;
