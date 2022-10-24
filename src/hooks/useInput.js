/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useState } from "react";

const useinput = (initVal) => {
  const [value, setValue] = useState(initVal);

  const onChangeValue = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, onChangeValue];
};

export default useinput;
