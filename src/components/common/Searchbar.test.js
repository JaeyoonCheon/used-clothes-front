import { render, screen, fireEvent } from "@testing-library/react";

import Searchbar from "./Searchbar";

describe("<Searchbar />", () => {
  it("Searchbar render test", () => {
    render(<Searchbar></Searchbar>);

    const searchbar = screen.getByPlaceholderText(
      "찾으시는 상품명,판매자를 입력해 주세요."
    );

    expect(searchbar).toBeInTheDocument();
  });
  it("Searchbar input test", () => {
    render(<Searchbar></Searchbar>);

    const searchbar = screen.getByPlaceholderText(
      "찾으시는 상품명,판매자를 입력해 주세요."
    );

    fireEvent.change(searchbar, { target: { value: "fake input" } });

    expect(searchbar).toHaveValue("fake input");

    const searchButton = screen.getByTestId("search");

    fireEvent.click(searchButton);

    expect(searchbar).toHaveValue("");
  });
});
