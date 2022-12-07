/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useState } from "react";

const useInput = (initVal) => {
  const [value, setValue] = useState(initVal);

  const onChangeValue = useCallback((value) => {
    setValue(value);
  }, []);

  return [value, onChangeValue];
};

export default useInput;
