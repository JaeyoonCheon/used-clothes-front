import React from "react";
import styled from "styled-components";
import {
  HiChevronDoubleLeft,
  HiChevronLeft,
  HiChevronDoubleRight,
  HiChevronRight,
} from "react-icons/hi";

import colors from "../../lib/styles/colors";

const PaginationContainer = styled.div`
  width: 100%;
`;

const PaginationButtonContainer = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  ul[class^="button"] {
    display: flex;
    justify-items: center;
    padding: 0;
    margin-left: 20px;
    font-weight: 400;
    font-size: 20px;

    cursor: pointer;

    & span {
      display: flex;
    }

    &[class$="current"] span {
      color: ${colors.blue[0]};
    }
  }
`;

const Pagination = (props) => {
  const { currentPage = 1, pageCount = 10, limit = 1, setCurrentPage } = props;

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
    <PaginationContainer>
      <PaginationButtonContainer>
        {currentPage > pageCount && (
          <ul
            className="button"
            data-testid="prevUnit"
            onClick={() => setCurrentPage(pageUnitNum * pageCount)}
          >
            <HiChevronDoubleLeft size={20}></HiChevronDoubleLeft>
          </ul>
        )}
        {currentPage > pageCount && (
          <ul
            className="button"
            data-testid="prevPage"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <HiChevronLeft size={20}></HiChevronLeft>
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
              <span>{page}</span>
            </ul>
          );
        })}
        {end < limit && (
          <ul
            className="button"
            data-testid="nextPage"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <HiChevronRight size={20}></HiChevronRight>
          </ul>
        )}
        {end < limit && (
          <ul
            className="button"
            data-testid="nextUnit"
            onClick={() => setCurrentPage((pageUnitNum + 1) * pageCount + 1)}
          >
            <HiChevronDoubleRight size={20}></HiChevronDoubleRight>
          </ul>
        )}
      </PaginationButtonContainer>
    </PaginationContainer>
  );
};

export default Pagination;
