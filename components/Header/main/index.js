import { motion } from "framer-motion";
import clsx from "clsx";
import useScrollDirection from "../../../lib/hooks/useScrollDirection";

export default function Header() {
  const [isScrollingUp] = useScrollDirection();

  const headerClasses = clsx(
    "fixed top-6 md:top-8 translate-x-[-50%] left-8 md:right-auto right-8",
    "text-xl tracking-tight text-center"
  );

  const variants = {
    outsideView: { opacity: 1, y: "-200%" },
    inView: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      layoutId="mainHeader"
      animate={isScrollingUp ? "inView" : "outsideView"}
      variants={variants}
      transition={{ type: "tween", duration: 0.5, delay: 0.25 }}
      className={headerClasses}
    >
      Bodega Import
    </motion.header>
  );
}
