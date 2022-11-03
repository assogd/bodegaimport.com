import useScrollDirection from "../../../lib/hooks/useScrollDirection";
import { motion } from "framer-motion";

const StickyHeader = ({ children, className }) => {
  const [isScrollingUp] = useScrollDirection();

  const variants = {
    outsideView: { y: "-2.25em" },
    inView: { y: 0 },
  };

  return (
    <motion.header
      className={className}
      animate={isScrollingUp ? "inView" : "outsideView"}
      variants={variants}
      transition={{ type: "tween", duration: 0.5, delay: 0.25 }}
    >
      {children}
    </motion.header>
  );
};

export default StickyHeader;
