import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";

import colors from "../../lib/styles/colors";
import { categoryData } from "../../lib/dummydata/dummydata";

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

  const onClickSmall = (key) => {
    console.log(
      `large:${largeSelected} / medium:${mediumSelected} / small:${smallSelected}`
    );
    console.log(`key:${key}`);
    if (smallSelected === key) {
      setSmallSelected(false);
    }
    if (smallSelected === false) {
      setSmallSelected(key);
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
                    className={`mediumItem ${
                      largeSelected === large.largeId &&
                      mediumSelected === medium.mediumId
                        ? "active"
                        : ""
                    }`}
                    onClick={() => onClickMedium(medium.mediumId)}
                  >
                    {medium.name}
                  </CategoryItem>
                  {mediumSelected &&
                    medium.child.map((small) => (
                      <CategorySubList key={small.smallId}>
                        <CategoryItem
                          className={`smallItem ${
                            smallSelected === small.smallId ? "active" : ""
                          }`}
                          onClick={() => onClickSmall(small.smallId)}
                        >
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
