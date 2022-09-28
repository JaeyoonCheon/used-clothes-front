import React from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";

const ModalContainer = styled.div`
  position: fixed;
  width: 400px;
  padding: 10px;

  border: none;
  box-shadow: 0 0 0 0.2;
`;

const FilterModal = (props) => {
  const { options, position } = props;

  return <div>FilterModal</div>;
};

export default FilterModal;
