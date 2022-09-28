import React from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";
import Checkbox from "../common/Checkbox";

const ModalContainer = styled.div`
  position: absolute;
  left: ${(props) => props.position[0]}px;
  top: ${(props) => props.position[1]}px;
  width: 300px;
  padding: 10px;
  z-index: 99;

  border: 0.3px solid ${colors.mono[1]};
  background: white;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  display: flex;
  flex-wrap: wrap;
`;

const FilterModal = (props) => {
  const { options, position, setModalState } = props;

  return (
    <ModalContainer
      position={position}
      onClick={() => {
        setModalState(-1);
      }}
    >
      {options.map((option) => (
        <Checkbox key={option} isModal={true}>
          <input type="checkbox" name="option"></input>
          <label>{option}</label>
        </Checkbox>
      ))}
    </ModalContainer>
  );
};

export default FilterModal;
