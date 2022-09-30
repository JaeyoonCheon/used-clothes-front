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

  console.log(
    `large:${largeSelected} / medium:${mediumSelected} / small:${smallSelected}`
  );

  const onClickLarge = (key) => {
    if (largeSelected === false) {
      setLargeSelected(key);
    }
    if (largeSelected === key) {
      setLargeSelected(false);
      setMediumSelected(false);
      setSmallSelected(false);
    }
    if (largeSelected !== key && largeSelected !== false) {
      setLargeSelected(false);
      setMediumSelected(false);
      setSmallSelected(false);
      setLargeSelected(key);
    }
  };

  const onClickMedium = (key) => {
    console.log(categoryData[largeSelected - 1]);
    console.log(`key:${key}`);
    if (mediumSelected === key) {
      setMediumSelected(false);
    }
    if (mediumSelected === false) {
      setMediumSelected(key);
    }
  };

  const onClickSmall = (key) => {
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
            {largeSelected === large.largeId &&
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
                  {mediumSelected === medium.mediumId &&
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
