import clsx from "clsx";
import { motion } from "framer-motion";

const Button = ({ children, className, onTap, href }) => {
  const classes = clsx("rounded p-2", className);

  return (
    <A href={href}>
      <motion.button
        className={classes}
        whileHover={{ y: 0, scale: 1.0125 }}
        whileTap={{ scale: 1, y: 2 }}
        onTap={onTap}
      >
        {children}
      </motion.button>
    </A>
  );
};

export default Button;

const A = ({ children, href }) => {
  if (!href) return children;

  return (
    <a href={href} target="_blank" className="block">
      {children}
    </a>
  );
};
