/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useState } from "react";

const useInput = (initValue, validCallback = null) => {
  const [value, setValue] = useState(initValue);

  const onChange = (e) => {
    let isValid = true;

    if (typeof validCallback === "function") {
      isValid = validCallback(e.target.value);
    }
    if (isValid) {
      setValue(e.target.value);
    }
  };

  return [value, onChange];
};

export default useInput;
