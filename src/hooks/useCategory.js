import React from "react";
import { useSelector } from "react-redux";

const useCategory = () => {
  const { main, sub } = useSelector((state) => {
    return {
      main: state.category.main_category,
      sub: state.category.sub_category,
    };
  });

  return { main, sub };
};

export default useCategory;
