import { screen, render, fireEvent } from "@testing-library/react";
import { faker } from "@faker-js/faker";

import Checkbox from "./Checkbox";

describe("<Checkbox />", () => {
  it("Checkbox render test", () => {
    const fakeLabel = "fakeLabel";
    render(<Checkbox checkboxLabel={fakeLabel} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    const checkboxLabel = screen.getByText(fakeLabel);
    expect(checkboxLabel).toBeInTheDocument();
  });
  it("Checkbox click test", () => {
    const fakeLabel = "fakeLabel";
    const fakeFn = jest.fn();
    render(<Checkbox checkboxLabel={fakeLabel} toggleCheckbox={fakeFn} />);
    const checkbox = screen.getByTestId("checkbox");

    console.log(checkbox);
    expect(checkbox).toHaveAttribute("checked", true);

    fireEvent.click(checkbox);

    console.log(checkbox);
  });
});
