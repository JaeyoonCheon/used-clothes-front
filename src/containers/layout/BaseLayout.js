import React from "react";

import Header from "../common/Header";
import Footer from "../common/Footer";

const BaseLayout = (props) => {
  const { children } = props;

  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  );
};

export default BaseLayout;
