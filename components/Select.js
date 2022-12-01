import Button from "./Button";
import clsx from "clsx";
import { motion } from "framer-motion";

export const Select = ({ children, label, className }) => {
  return <div className={clsx(className)}>{children}</div>;
};

export const Option = ({ value, useState, children, parent, active }) => {
  const [state, setState] = useState;

  return (
    <Button
      size="lg"
      className={clsx("relative grow")}
      onTap={() => setState(value)}
    >
      {state === value && (
        <motion.div layoutId={`selected-${parent}`} className={active} />
      )}
      <span className="relative z-10">{children}</span>
    </Button>
  );
};
