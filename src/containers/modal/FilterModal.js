import React from "react";
import styled from "styled-components";
import { MdClear } from "react-icons/md";

import colors from "../../lib/styles/colors";
import Checkbox from "../common/Checkbox";

const ModalContainer = styled.div`
  position: absolute;
  left: ${(props) => props.position[0]}px;
  top: ${(props) => props.position[1]}px;
  width: 300px;
  padding: 10px;
  z-index: 50;

  border: 0.3px solid ${colors.mono[1]};
  background: white;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  display: flex;

  .clearbutton {
    flex: none;
    margin-left: auto;

    cursor: pointer;
  }
`;

const CheckboxList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const FilterModal = (props) => {
  const { options, position, setModalState, checkedOptions, toggleCheckbox } =
    props;

  return (
    <ModalContainer position={position}>
      <CheckboxList>
        {options.map((option) => (
          <Checkbox
            key={option}
            isModal={true}
            checkboxLabel={option}
            checkedOptions={checkedOptions}
            toggleCheckbox={toggleCheckbox}
          ></Checkbox>
        ))}
      </CheckboxList>
      <MdClear
        className="clearbutton"
        size={20}
        onClick={() => {
          setModalState(-1);
        }}
      ></MdClear>
    </ModalContainer>
  );
};

export default FilterModal;
