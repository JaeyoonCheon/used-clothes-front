import { screen, render, fireEvent, rerender } from "@testing-library/react";
import { faker } from "@faker-js/faker";

import Checkbox from "./Checkbox";

jest.useFakeTimers();

describe("<Checkbox />", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });
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

    expect(checkbox).toHaveProperty("checked", false);

    fireEvent.click(checkbox);

    expect(checkbox).toHaveProperty("checked", true);
  });
  it("Checkbox existent option test", () => {
    const fakeLabelNumber = 11;
    const fakeFn = jest.fn();
    const checkboxOptions = new Set([fakeLabelNumber]);
    const { rerender } = render(
      <Checkbox
        checkboxLabel={11}
        checkedOptions={checkboxOptions}
        toggleCheckbox={fakeFn}
      />
    );

    rerender(
      <Checkbox
        checkboxLabel={11}
        checkedOptions={checkboxOptions}
        toggleCheckbox={fakeFn}
      />
    );

    const checkbox = screen.getByTestId("checkbox");

    expect(checkbox).toHaveProperty("checked", true);
  });
});
