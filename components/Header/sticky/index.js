import useScrollDirection from "../../../lib/hooks/useScrollDirection";
import { motion } from "framer-motion";
import useBreakpoints from "../../../lib/hooks/useBreakpoints";
import clsx from "clsx";
import { useState, useLayoutEffect, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const StickyHeader = ({ children, className, secondLevel, placement }) => {
  const [isStuck, setStuck] = useState(false);
  const [isScrollingUp] = useScrollDirection();
  const { ref, inView, entry } = useInView({
    threshold: 1,
  });
  useEffect(() => {
    setStuck(!inView);
  }, [inView, setStuck]);

  const isMd = useBreakpoints([]).some((n) => n === "md");
  const isSecondRow = placement.row === "second";

  const big = isSecondRow ? "0" : "-200%";

  const variants = {
    outsideView: { y: isMd ? big : "-2.25em" },
    inView: { y: 0 },
  };

  console.log({ children, isStuck });

  return (
    <header
      ref={ref}
      className={clsx(
        "top-[-1px] z-20 px-4 sm:px-6",
        "delay-250 duration-500",
        col(placement.col),
        row(placement.row),
        className
      )}
    >
      <motion.div className={clsx("inline-block")}>{children}</motion.div>
    </header>
  );

  return (
    <header
      ref={ref}
      className={clsx(
        "sticky top-[-1px] z-20 px-4 sm:px-6",
        "delay-250 duration-500",
        col(placement.col),
        row(placement.row),
        isStuck && "text-peach",
        className
      )}
    >
      <motion.div
        className={clsx("inline-block")}
        animate={!isScrollingUp && isStuck ? "outsideView" : "inView"}
        variants={variants}
        transition={{ type: "tween", duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
    </header>
  );
};

const col = (x) => {
  if (x === "left") return "left-0 text-center md:text-left";
  if (x === "center")
    return "md:inline-block md:left-[50%] md:translate-x-[-50%] md:w-1/2 text-center";
  if (x === "right") return "inset-x-0 text-center md:text-right";
};

const row = (y) => {
  if (y === "first") return "md:pt-6";
  if (y === "second") return "pt-[3.25em] md:pt-6";
  if (y === "second") return "pt-[3.25em] sm:pt-[3.5em] xl:pt-[2.4vw]";
};

export default StickyHeader;
