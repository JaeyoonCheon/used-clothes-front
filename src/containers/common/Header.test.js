import { render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";

import Header from "./Header";

describe("<Header />", () => {
  it("Header render test", () => {
    render(<Header></Header>);

    const title = screen.getByText("Title");
    const login = screen.getByText("로그인");
    const registration = screen.getByText("상품등록");
    const myItem = screen.getByText("내 상품");

    expect(title).toBeInTheDocument();
    expect(login).toBeInTheDocument();
    expect(registration).toBeInTheDocument();
    expect(myItem).toBeInTheDocument();
  });
});
