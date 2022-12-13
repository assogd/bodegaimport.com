import clsx from "clsx";
import { motion } from "framer-motion";
import useScrollDirection from "../../../lib/hooks/useScrollDirection";
import { useState, useLayoutEffect, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Header = ({
  children,
  className,
  secondLevel,
  placement,
  animate = "",
}) => {
  const [isStuck, setStuck] = useState(false);
  const [isScrollingUp] = useScrollDirection();
  const { ref, inView, entry } = useInView({
    threshold: 1,
  });
  useEffect(() => {
    setStuck(!inView);
  }, [inView, setStuck]);

  return (
    <header
      className={clsx(
        "top-[-1px] z-20 px-4 sm:px-6 lg:pt-5",
        col(placement?.col ?? "center"),
        className
      )}
      ref={ref}
    >
      <div
        className={clsx(
          "inline-block",
          "delay-250 duration-500",
          !isScrollingUp && isStuck && animate
        )}
      >
        {children}
      </div>
    </header>
  );
};

const col = (x) => {
  if (x === "left") return "left-0 text-center lg:text-left";
  if (x === "center")
    return "lg:inline-block lg:left-[50%] lg:translate-x-[-50%] lg:w-1/2 text-center";
  if (x === "right") return "inset-x-0 text-center lg:text-right";
};

export default Header;
