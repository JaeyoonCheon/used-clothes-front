import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { useSelector, useDispatch, batch } from "react-redux";

import colors from "../../lib/styles/colors";
import { changeFilter } from "../../slices/productSlice";

const CategoryContainer = styled.div`
  width: 100%;
  background: white;

  .category_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    font-size: 18px;

    .foldingButton {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  }
`;

const CategorySubList = styled.div`
  .mainItem {
    &.active {
      color: ${colors.blue[0]};
    }
  }
  .subItem {
    margin-left: 10px;
    &.active {
      color: ${colors.blue[0]};
    }
  }
`;

const CategoryItem = styled.div`
  font-weight: 400;
  font-size: 14px;
  margin: 5px 0 10px 0;

  cursor: pointer;
`;

const Category = () => {
  const [fold, setFold] = useState(true);
  const [subCategoryList, setSubCategoryList] = useState([]);

  const { mainCategory, subCategory } = useSelector((state) => ({
    mainCategory: state.category.main_category,
    subCategory: state.category.sub_category,
  }));
  const { mainSelected, subSelected } = useSelector(({ product }) => {
    return {
      mainSelected: product.list.options.filter.main_category_id,
      subSelected: product.list.options.filter.sub_category_id,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const currentSub = subCategory.filter((sub) => {
      return sub.main_category_id === mainSelected;
    });
    setSubCategoryList(currentSub);
  }, [mainSelected]);

  const onClickmain = (key) => {
    if (mainSelected === null) {
      dispatch(
        changeFilter({
          name: "main_category_id",
          value: key,
        })
      );
    }
    if (mainSelected === key) {
      dispatch(
        changeFilter({
          name: "main_category_id",
          value: null,
        })
      );
      dispatch(
        changeFilter({
          name: "sub_category_id",
          value: null,
        })
      );
      setSubCategoryList([]);
    }
    if (mainSelected !== key && mainSelected !== null) {
      dispatch(
        changeFilter({
          name: "main_category_id",
          value: null,
        })
      );
      dispatch(
        changeFilter({
          name: "sub_category_id",
          value: null,
        })
      );
      dispatch(
        changeFilter({
          name: "main_category_id",
          value: key,
        })
      );
    }
  };

  const onClicksub = (key) => {
    if (subSelected === key) {
      dispatch(
        changeFilter({
          name: "sub_category_id",
          value: null,
        })
      );
    } else {
      dispatch(
        changeFilter({
          name: "sub_category_id",
          value: key,
        })
      );
    }
  };

  return (
    <CategoryContainer>
      <div className="category_header">
        <div>카테고리</div>
        {fold ? (
          <AiOutlineUp
            className="foldingButton"
            onClick={() => setFold(!fold)}
          ></AiOutlineUp>
        ) : (
          <AiOutlineDown
            className="foldingButton"
            onClick={() => setFold(!fold)}
          ></AiOutlineDown>
        )}
      </div>
      {fold &&
        mainCategory &&
        mainCategory.map((main) => (
          <CategorySubList key={main.main_category_id}>
            <CategoryItem
              className={`mainItem ${
                mainSelected === main.main_category_id ? "active" : ""
              }`}
              onClick={() => onClickmain(main.main_category_id)}
            >
              {main.main_category_name}
            </CategoryItem>
            {mainSelected === main.main_category_id &&
              subCategoryList.map((sub) => (
                <CategorySubList key={sub.sub_category_id}>
                  <CategoryItem
                    className={`subItem ${
                      mainSelected === main.main_category_id &&
                      subSelected === sub.sub_category_id
                        ? "active"
                        : ""
                    }`}
                    onClick={() => onClicksub(sub.sub_category_id)}
                  >
                    {sub.sub_category_name}
                  </CategoryItem>
                </CategorySubList>
              ))}
          </CategorySubList>
        ))}
    </CategoryContainer>
  );
};

export default Category;
