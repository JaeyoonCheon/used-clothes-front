import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import colors from "../lib/styles/colors";
import BaseLayout from "../components/layout/BaseLayout";
import Aside from "../components/side/Aside";
import { SmallCardList } from "../components/card/CardList";
import Pagination from "../components/common/Pagination";
import { list, changeOption } from "../slices/productSlice";
import { getCategory } from "../slices/categorySlice";
import { getMetadata } from "../slices/metadataSlice";
import { getBrandList } from "../slices/brandSlice";
import { getPurchasePlaceList } from "../slices/purchasePlaceSlice";
import { toggleLocationModal } from "../slices/modalSlice";
import LocationModal from "../components/modal/LocationModal";
import useIntersect from "../hooks/useIntersect";

const Wrapper = styled.div``;

const HomePageContainer = styled.div`
  display: flex;
  margin: 0 auto;
  margin-bottom: 300px;
  width: 1180px;

  .aside_category_option {
    padding-top: 40px;
    margin-left: auto;
  }
`;

const HeaderSpacer = styled.div`
  height: 60px;
`;

const ContentContainer = styled.div`
  width: 100%;
  margin-right: auto;
`;

const NavBar = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;

  .user_location {
    display: flex;
    align-items: center;

    cursor: pointer;
  }
  .location_name {
    margin-right: 5px;
    font-weight: 400;
    font-size: 20px;
  }
  .location_icon {
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  .sort_orders {
    display: flex;

    align-items: center;
    justify-content: end;

    span {
      color: ${colors.mono[0]};
      font-weight: 400;
      font-size: 14px;

      cursor: pointer;

      &.active {
        color: ${colors.blue[0]};
      }
    }
    span:nth-child(n + 2)::before {
      content: "|";
      margin: 0 1px 0 1px;
    }
  }
`;

const sortOrders = ["최신 순", "이전 순", "가격 높은 순", "가격 낮은 순"];
const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { isLoginModal, isLocationModal } = useSelector((state) => {
    return {
      isLoginModal: state.modal.login,
      isLocationModal: state.modal.location,
    };
  });
  const {
    filter: productOptions,
    sort_by,
    order,
    elements,
    page,
    location,
    scope_a_code,
    scope_b_code,
    scope_c_code,
  } = useSelector((state) => {
    const options = state.product.list.options;

    return {
      filter: options.filter,
      sort_by: options.sort_by,
      order: options.order,
      elements: options.elements,
      page: options.page,
      location: options.location,
      scope_a_code: options.scope_a_code,
      scope_b_code: options.scope_b_code,
      scope_c_code: options.scope_c_code,
    };
  });

  const { productList } = useSelector(({ product }) => ({
    productList: product.list.productList,
  }));

  useEffect(() => {
    console.log("Fetch new options");
    dispatch(getCategory());
    dispatch(getMetadata("colors"));
    dispatch(getBrandList());
    dispatch(getPurchasePlaceList());
    dispatch(list(productOptions));
  }, []);

  useEffect(() => {
    dispatch(list(productOptions));
  }, [
    productOptions,
    sort_by,
    order,
    elements,
    page,
    scope_a_code,
    scope_b_code,
    scope_c_code,
  ]);

  const onClickLocation = () => {
    dispatch(toggleLocationModal(true));
  };
  const onClickSort = (order) => {
    dispatch(
      changeOption({
        name: "sorting",
        value: order,
      })
    );
    dispatch(list(productOptions));
  };
  const onClickOption = (typeCode, option) => {
    dispatch(
      changeOption({
        name: typeCode,
        value: option,
      })
    );
  };
  const onClickPage = (nextPage) => {
    setCurrentPage(nextPage);
    onClickOption((prev) => ({
      ...prev,
      page: nextPage,
    }));
  };

  const { isListLoaded } = useSelector((state) => {
    return {
      isListLoaded: state.loading[`product/list`],
    };
  });

  console.log(isListLoaded);

  const [_, setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    await dispatch(list(productOptions));
    observer.observe(entry.target);
  }, {});

  return (
    <BaseLayout>
      <HeaderSpacer></HeaderSpacer>
      <Wrapper>
        <HomePageContainer>
          <div className="aside_category_option">
            <Aside
              options={productOptions}
              onClickOption={onClickOption}
            ></Aside>
          </div>
          <ContentContainer>
            <NavBar>
              <div className="user_location" onClick={onClickLocation}>
                <span className="location_name">{location}</span>
                <img
                  className="location_icon"
                  src="location.svg"
                  alt="location"
                ></img>
              </div>
              {isLocationModal && <LocationModal></LocationModal>}
              <div className="sort_orders">
                {sortOrders.map((order, i) => (
                  <span
                    className={productOptions.sorting === order ? "active" : ""}
                    key={i}
                    onClick={() => onClickSort(order)}
                  >{`${order}`}</span>
                ))}
              </div>
            </NavBar>
            <SmallCardList itemDatas={productList}></SmallCardList>
            <hr></hr>
            {!isListLoaded && <p ref={setRef}> Loading ... </p>}
            <Pagination
              currentPage={currentPage}
              pageCount={10}
              limit={40}
              setCurrentPage={onClickPage}
            ></Pagination>
          </ContentContainer>
        </HomePageContainer>
      </Wrapper>
    </BaseLayout>
  );
};

export default HomePage;
