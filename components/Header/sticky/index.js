import useScrollDirection from "../../../lib/hooks/useScrollDirection";
import { motion } from "framer-motion";
import useBreakpoints from "../../../lib/hooks/useBreakpoints";
import clsx from "clsx";

const StickyHeader = ({ children, className, secondLevel }) => {
  const [isScrollingUp] = useScrollDirection();
  const isMd = useBreakpoints([]).some((n) => n === "md");

  const yannick = secondLevel ? "-2.75em" : "-200%";

  const variants = {
    outsideView: { y: isMd ? yannick : "-2.25em" },
    inView: { y: 0 },
  };

  return (
    <motion.header
      className={clsx(className, "pointer-events-none z-30 select-none")}
      animate={isScrollingUp ? "inView" : "outsideView"}
      variants={variants}
      transition={{ type: "tween", duration: 0.5, delay: 0.25 }}
    >
      {children}
    </motion.header>
  );
};

export default StickyHeader;
