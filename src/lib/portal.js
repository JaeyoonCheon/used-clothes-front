import React from "react";
import reactDom from "react-dom";

const Portal = (props) => {
  const { children } = props;

  const modalPortal = document.getElementById("modal");
  return reactDom.createPortal(children, modalPortal);
};

export default Portal;
