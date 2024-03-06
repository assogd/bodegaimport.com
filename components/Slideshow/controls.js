import { motion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";
import Button from "../Button";

export const Control = ({ onTap, disabled, className, children }) => {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      className={clsx(
        "absolute inset-y-0 flex w-36 items-center p-2 font-mono uppercase text-white sm:p-4",
        className,
        !hover && "from-black/0"
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {
        <Button
          onTap={!disabled && onTap}
          size="sm"
          className={clsx(
            "h-12 w-12 rounded-full text-[2em]",
            disabled ? "" : "bg-black/20"
          )}
          whileHover={{ scale: 1.1 }}
          disabled={disabled}
        >
          <span className="translate-y-[.05em]">{children}</span>
        </Button>
      }
    </motion.div>
  );
};

export const Dots = ({ children }) => {
  return (
    <div
      className={`absolute inset-x-0 top-0 flex max-w-full justify-start bg-gradient-to-b from-black/20 py-6 pl-6 pr-24 sm:justify-center sm:pl-24`}
    >
      {children}
    </div>
  );
};

export const Dot = ({ i, onTap, active }) => {
  const dotClasses = clsx(
    "h-[.4rem] w-[.4rem] rounded-full border border-white",
    active && "bg-white"
  );
  return (
    <Button size="sm" onTap={onTap}>
      <motion.div className={dotClasses} />
    </Button>
  );
};
