import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";

const Button = ({ children, className, onTap, href }) => {
  const classes = clsx(
    "inline-flex items-center justify-center gap-1 rounded p-2",
    className
  );

  return (
    <A href={href}>
      <motion.button
        className={classes}
        whileHover={{ y: 0, scale: 1.0125 }}
        whileTap={{ scale: 1, y: 2 }}
        onTap={onTap}
      >
        {children}
        {href && (
          <Image
            src={"/icons/launch.svg"}
            alt={"External link"}
            width="16"
            height="16"
          />
        )}
      </motion.button>
    </A>
  );
};

export default Button;

const A = ({ children, href }) => {
  if (!href) return children;

  return (
    <a href={href} target="_blank">
      {children}
    </a>
  );
};
