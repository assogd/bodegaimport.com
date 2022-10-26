import { useState } from "react";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

const useScrollDirection = () => {
  const [hideOnScroll, setHideOnScroll] = useState(true);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y || currPos.y > -100;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll]
  );

  return [hideOnScroll];
};

export default useScrollDirection;
