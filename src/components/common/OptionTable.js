import React from "react";
import styled from "styled-components";
import colors from "../../lib/styles/colors";

const OptionBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;

  align-items: center;
  border: 0.5px solid ${colors.mono[1]};

  .optionName {
    min-width: 80px;
    padding-left: 20px;

    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
  }
  .optionDetail {
    height: 100%;
    display: flex;

    align-items: center;
  }
`;

const ItemBox = styled.ul`
  padding-right: 20px;
`;

const ItemDetailItemBox = styled.li`
  min-width: 60px;
  margin: 5px 0;
  margin-right: 15px;

  div {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
  }
  &.item_color {
    min-width: 0;
  }
`;

const OptionColor = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 70%;

  border: 0.5px solid ${colors.mono[1]};
  background: ${(props) => props.color};
`;

const testOptions = [
  {
    id: "color",
    name: "색상",
    data: ["#FFFFFF", "#000000", "#343B7E"],
  },
  { id: "size", name: "사이즈", data: ["S", "M", "L", "XL"] },
  {
    id: "brand",
    name: "브랜드",
    data: [
      "브랜드1",
      "브랜드2",
      "브랜드3",
      "브랜드4",
      "브랜드5",
      "브랜드6",
      "브랜드7",
      "브랜드8",
      "브랜드9",
      "브랜드10",
      "브랜드11",
      "브랜드12",
    ],
  },
  {
    id: "condition",
    name: "상품 상태",
    data: ["새 제품", "깨끗함", "사용감 있음"],
  },
  {
    id: "purchaseplace",
    name: "구입처",
    data: ["구입처1", "구입처2", "구입처3", "구입처4"],
  },
  { id: "material", name: "소재", data: ["면", "폴리", "가죽", "기타"] },
  {
    id: "price",
    name: "가격",
    data: [
      "전체",
      "~10000원",
      "10000원~30000원",
      "30000원~50000월",
      "50000원~",
    ],
  },
];

const OptionTable = () => {
  return (
    <>
      {testOptions.map((option) => {
        const { id, name, data } = option;

        return (
          <OptionBox key={id}>
            <p className="optionName">{name}</p>
            <div className="optionDetail">
              <ItemBox>
                {data.map((optionDetail) => {
                  return id === "color" ? (
                    <ItemDetailItemBox
                      key={optionDetail}
                      className={`item_${id}`}
                    >
                      <OptionColor color={optionDetail}></OptionColor>
                    </ItemDetailItemBox>
                  ) : (
                    <ItemDetailItemBox key={optionDetail}>
                      <div>{optionDetail}</div>
                    </ItemDetailItemBox>
                  );
                })}
              </ItemBox>
            </div>
          </OptionBox>
        );
      })}
    </>
  );
};

export default OptionTable;
