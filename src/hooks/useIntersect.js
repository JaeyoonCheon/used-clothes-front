import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { listNextProduct } from "../slices/productSlice";

const defaultOption = {
  root: null,
  threshold: 1,
  rootMargin: "0px",
};

const useIntersect = (onIntersect, option) => {
  const [ref, setRef] = useState(null);

  const { page } = useSelector((state) => {
    return { page: state.product.list.options.page };
  });

  const checkIntersect = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        onIntersect(entry, observer, page);
      }
    },
    [page]
  );
  useEffect(() => {
    let observer;
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, {
        ...defaultOption,
        ...option,
      });
      observer.observe(ref);
    }
    return () => observer && observer.disconnect();
  }, [ref, option.root, option.threshold, option.rootMargin, checkIntersect]);
  return [ref, setRef];
};

export default useIntersect;
