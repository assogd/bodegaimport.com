import { motion } from "framer-motion";
import clsx from "clsx";

export default function Header({ inView }) {
  const headerClasses = clsx(
    "fixed top-4 md:top-6 translate-x-[-50%] left-6 md:right-auto right-6 z-30",
    "text-xl tracking-tight text-center"
  );

  const variants = {
    outsideView: { opacity: 1, y: "-200%" },
    inView: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      layoutId="mainHeader"
      initial={"outsideView"}
      animate={inView ? "inView" : "outsideView"}
      variants={variants}
      transition={{ type: "tween", duration: 0.5, delay: 0.25 }}
      className={headerClasses}
    >
      Bodega Import
    </motion.header>
  );
}
