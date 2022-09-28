import { render } from "@testing-library/react";

import Card from "./Card";

describe("<Card />", () => {
  it("Card snapshot check", () => {
    const { getByText } = render(<Card></Card>);
  });
  it("Card item name test", () => {});
});
