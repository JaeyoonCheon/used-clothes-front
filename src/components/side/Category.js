import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";

import colors from "../../lib/styles/colors";

const CategoryContainer = styled.div`
  width: 180px;
  background: white;

  .category-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
`;

const CategorySubList = styled.div`
  .largeItem {
    &.active {
      color: ${colors.blue[0]};
    }
  }
  .mediumItem {
    margin-left: 10px;
    &.active {
      color: ${colors.blue[0]};
    }
  }
  .smallItem {
    margin-left: 15px;
    &.active {
      color: ${colors.blue[0]};
    }
  }
`;

const CategoryItem = styled.div`
  font-family: "Noto Serif";
  font-weight: 200;
  font-size: 14px;
  margin: 5px 0 10px 0;
`;

const categoryData = [
  {
    largeId: 1,
    name: "상의",
    child: [
      { mediumId: 1, name: "티셔츠", child: [] },
      { mediumId: 2, name: "셔츠/블라우스", child: [] },
      { mediumId: 3, name: "맨투맨", child: [] },
      { mediumId: 4, name: "후드티", child: [] },
      { mediumId: 5, name: "니트/스웨터", child: [] },
    ],
  },
  {
    largeId: 2,
    name: "아우터",
    child: [],
  },
  {
    largeId: 3,
    name: "바지",
    child: [],
  },
  {
    largeId: 4,
    name: "원피스",
    child: [],
  },
  {
    largeId: 5,
    name: "스커트",
    child: [],
  },
  {
    largeId: 6,
    name: "가방",
    child: [],
  },
  {
    largeId: 7,
    name: "스니커즈",
    child: [],
  },
  {
    largeId: 8,
    name: "신발",
    child: [],
  },
  {
    largeId: 9,
    name: "시계",
    child: [],
  },
  {
    largeId: 10,
    name: "모자",
    child: [],
  },
  {
    largeId: 11,
    name: "스포츠",
    child: [],
  },
  {
    largeId: 12,
    name: "양말/레그웨어",
    child: [],
  },
  {
    largeId: 13,
    name: "안경",
    child: [],
  },
  {
    largeId: 14,
    name: "악세서리",
    child: [],
  },
];

const Category = () => {
  const [fold, setFold] = useState(true);
  const [largeSelected, setLargeSelected] = useState(false);
  const [mediumSelected, setMediumSelected] = useState(false);
  const [smallSelected, setSmallSelected] = useState(false);

  const onClickLarge = (key) => {
    if (largeSelected === key) {
      setLargeSelected(false);
      setMediumSelected(mediumSelected);
    }
    if (largeSelected === false && categoryData[key - 1].child.length !== 0) {
      setLargeSelected(key);
    }
  };

  const onClickMedium = (key) => {
    if (mediumSelected === key) {
      setMediumSelected(false);
    }
    if (
      mediumSelected === false &&
      categoryData[largeSelected - 1].child[key - 1].child.length !== 0
    ) {
      setMediumSelected(key);
    }
  };

  return (
    <CategoryContainer>
      <div className="category-header">
        <div>카테고리</div>
        {!fold && (
          <AiOutlineDown onClick={() => setFold(!fold)}></AiOutlineDown>
        )}
        {fold && <AiOutlineUp onClick={() => setFold(!fold)}></AiOutlineUp>}
      </div>
      {fold &&
        categoryData.map((large) => (
          <CategorySubList key={large.largeId}>
            <CategoryItem
              className={`largeItem ${
                largeSelected === large.largeId ? "active" : ""
              }`}
              onClick={() => onClickLarge(large.largeId)}
            >
              {large.name}
            </CategoryItem>
            {largeSelected &&
              large.child.map((medium) => (
                <CategorySubList key={medium.mediumId}>
                  <CategoryItem
                    className="mediumItem"
                    onClick={() => onClickMedium(medium.mediumId)}
                  >
                    {medium.name}
                  </CategoryItem>
                  {mediumSelected &&
                    medium.child.map((small) => (
                      <CategorySubList key={small.smallId}>
                        <CategoryItem className="smallItem">
                          {small.name}
                        </CategoryItem>
                      </CategorySubList>
                    ))}
                </CategorySubList>
              ))}
          </CategorySubList>
        ))}
    </CategoryContainer>
  );
};

export default Category;
