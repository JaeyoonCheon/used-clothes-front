import { render, screen, fireEvent } from "@testing-library/react";

import Pagination from "./Pagination";
import colors from "../../lib/styles/colors";

describe("<Pagination />", () => {
  it("Pagination render test", () => {
    render(<Pagination></Pagination>);

    const firstPageButton = screen.getByText("1");

    expect(firstPageButton).toBeInTheDocument();
  });
  it("Pagination page number button test", async () => {
    const fakeFn = jest.fn();
    const { rerender } = render(
      <Pagination
        currentPage={1}
        pageCount={10}
        limit={30}
        setCurrentPage={fakeFn}
      ></Pagination>
    );

    const page1 = screen.getByText("1");
    expect(page1).toHaveStyle(`color: ${colors.blue[0]}`);

    const page2 = screen.getByText("2");
    fireEvent.click(page2);
    expect(fakeFn).toBeCalledTimes(1);
  });
  it("Pagination page nav button test", () => {
    const fakeFn = jest.fn();
    const { rerender } = render(
      <Pagination
        currentPage={11}
        pageCount={10}
        limit={30}
        setCurrentPage={fakeFn}
      ></Pagination>
    );

    const nextPage = screen.getByTestId("nextPage");
    fireEvent.click(nextPage);
    expect(fakeFn).toBeCalledTimes(1);

    const nextUnit = screen.getByTestId("nextUnit");
    fireEvent.click(nextUnit);
    expect(fakeFn).toBeCalledTimes(2);

    const prevPage = screen.getByTestId("prevPage");
    fireEvent.click(prevPage);
    expect(fakeFn).toBeCalledTimes(3);

    const prevUnit = screen.getByTestId("prevUnit");
    fireEvent.click(prevUnit);
    expect(fakeFn).toBeCalledTimes(4);
  });
});
