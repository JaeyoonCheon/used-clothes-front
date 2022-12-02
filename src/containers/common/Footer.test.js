import { screen, render } from "@testing-library/react";

import Footer from "./Footer";

describe("<Footer />", () => {
  it("Footer render test", () => {
    const { container } = render(<Footer></Footer>);

    // eslint-disable-next-line testing-library/no-node-access
    const footer = container.firstChild;

    expect(footer).toBeInTheDocument();
  });
});
