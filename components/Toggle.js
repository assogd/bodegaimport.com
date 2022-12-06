import Button from "./Button";
import { motion } from "framer-motion";
import clsx from "clsx";

const Toggle = ({ onTap, children, options }) => {
  const width = 2 + options.length * 2;

  return (
    <Button
      size="minimal"
      whileTap={{}}
      onTap={onTap}
      className="items-baseline"
    >
      {children}
      <div
        className={clsx(
          `relative ml-[0.125em] box-content h-[0.375em] translate-y-[0.025em] rounded-full border-2`,
          `w-${width}`
        )}
      >
        <motion.div
          className="h-[0.375em] w-4 rounded-full border-2 bg-black"
          animate={{ x: `${(options.active / options.length) * 100}%` }}
        />
      </div>
    </Button>
  );
};

export default Toggle;
