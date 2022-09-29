import { screen, render, getByAltText } from "@testing-library/react";
import { faker } from "@faker-js/faker";

import CardList from "./CardList";

describe("<CardList />", () => {
  it("Mapping <Card /> components test", () => {
    const dummyObjArray = [];

    dummyObjArray.push({
      id: faker.datatype.number(10000),
      itemimage: faker.image.abstract(),
      itemname: faker.commerce.product(),
      itemprice: faker.commerce.price(),
    });
    render(<CardList itemDatas={dummyObjArray}></CardList>);

    const itemImage = screen.getByAltText("item");
    expect(itemImage).toBeInTheDocument();

    const itemName = screen.getByText(dummyObjArray[0].itemname.trimEnd());
    expect(itemName).toBeInTheDocument();

    const itemPrice = screen.getByText(
      `${dummyObjArray[0].itemprice.trimEnd()}원`
    );
    expect(itemPrice).toBeInTheDocument();
  });
});
