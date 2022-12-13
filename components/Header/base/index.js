import clsx from "clsx";
import { motion } from "framer-motion";

const Header = ({ children, className, secondLevel, placement, inView }) => {
  return (
    <motion.header
      className={clsx(
        "top-0 z-20 px-4 sm:px-6 lg:pt-6",
        col(placement?.col ?? "center"),
        !inView && "translate-y-[-200%]",
        className
      )}
    >
      <motion.div className={clsx("inline-block")}>{children}</motion.div>
    </motion.header>
  );
};

const col = (x) => {
  if (x === "left") return "left-0 text-center lg:text-left";
  if (x === "center")
    return "lg:inline-block lg:left-[50%] lg:translate-x-[-50%] lg:w-1/2 text-center";
  if (x === "right") return "inset-x-0 text-center lg:text-right";
};

export default Header;
