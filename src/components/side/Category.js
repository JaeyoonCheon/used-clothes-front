import React from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";

const CategoryContainer = styled.div`
  width: 180px;
  padding: 10px;

  .category-header {
    display: flex;
    justify-content: space-between;
  }
`;

const CategorySubList = styled.div``;

const CategoryItem = styled.div`
  font-family: "Noto Serif";
  font-weight: 100;
  font-size: 14px;
`;

const categoryData = [
  {
    name: "상의",
    child: ["티셔츠", "셔츠/블라우스", "맨투맨", "후드티", "니트/스웨터"],
  },
  {
    name: "아우터",
    child: [],
  },
  {
    name: "바지",
    child: [],
  },
  {
    name: "원피스",
    child: [],
  },
  {
    name: "스커트",
    child: [],
  },
  {
    name: "가방",
    child: [],
  },
  {
    name: "스니커즈",
    child: [],
  },
  {
    name: "신발",
    child: [],
  },
  {
    name: "시계",
    child: [],
  },
  {
    name: "모자",
    child: [],
  },
  {
    name: "스포츠",
    child: [],
  },
  {
    name: "양말/레그웨어",
    child: [],
  },
  {
    name: "안경",
    child: [],
  },
  {
    name: "악세서리",
    child: [],
  },
];

const Category = () => {
  return (
    <CategoryContainer>
      <div className="category-header">
        <div>카테고리</div>
        <span>Arrow</span>
      </div>
      {categoryData.map((large) => (
        <CategorySubList>
          <CategoryItem>{large.name}</CategoryItem>
          {large.child.map((medium) => (
            <CategorySubList>
              <CategoryItem>{medium}</CategoryItem>
            </CategorySubList>
          ))}
        </CategorySubList>
      ))}
    </CategoryContainer>
  );
};

export default Category;
