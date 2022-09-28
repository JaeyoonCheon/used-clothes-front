import React from "react";
import styled from "styled-components";

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 1px 0 1px 0;
`;

const Checkbox = (props) => {
  const { isModal } = props;
  return (
    <CheckboxContainer className={isModal ? "modelCheckbox" : ""}>
      {props.children}
    </CheckboxContainer>
  );
};

export default Checkbox;
