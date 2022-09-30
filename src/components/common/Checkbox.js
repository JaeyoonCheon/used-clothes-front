import React, { useState, useEffect } from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";

const CheckboxContainer = styled.div`
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 1px 0 1px 0;

  .checkbox {
    width: 15px;
    height: 15px;

    cursor: pointer;
  }
  .optionName {
    margin-left: 5px;
    color: ${colors.mono[0]};

    cursor: pointer;
  }
`;

const Checkbox = (props) => {
  const { isModal, checkboxLabel, checkedOptions, toggleCheckbox } = props;

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (
      typeof checkedOptions === "object" &&
      checkedOptions.has(checkboxLabel)
    ) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [checkedOptions, checkboxLabel]);

  const onClick = () => {
    toggleCheckbox(checkboxLabel);
    setChecked(!checked);
  };

  return (
    <CheckboxContainer className={isModal ? "modelCheckbox" : ""}>
      <input
        className="checkbox"
        type="checkbox"
        name="option"
        id="option"
        checked={checked}
        onChange={onClick}
      ></input>
      <label htmlFor="option" className="optionName">
        {checkboxLabel}
      </label>
    </CheckboxContainer>
  );
};

export default Checkbox;
