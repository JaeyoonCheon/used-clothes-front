import { screen, render } from "@testing-library/react";
import { faker } from "@faker-js/faker";

import Card from "./Card";

describe("<Card />", () => {
  it("Card rendering test", () => {
    render(<Card></Card>);

    const itemImage = screen.getByAltText("item");
    expect(itemImage).toBeInTheDocument();

    const itemName = screen.getByText("itemname");
    expect(itemName).toBeInTheDocument();

    const itemPrice = screen.getByText("10000원");
    expect(itemPrice).toBeInTheDocument();
  });
  it("Card name test", () => {
    const fakeName = faker.commerce.productName();
    render(<Card itemname={fakeName}></Card>);

    const itemName = screen.getByText(fakeName);
    expect(itemName).toHaveTextContent(fakeName);
  });
  it("Card item price test", () => {
    const fakePrice = `${faker.commerce.price()}원`;
    render(<Card itemprice={fakePrice}></Card>);

    const itemPrice = screen.getByText(fakePrice);
    expect(itemPrice).toHaveTextContent(fakePrice);
  });
});
