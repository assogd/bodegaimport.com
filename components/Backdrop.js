import { motion } from "framer-motion";
import clsx from "clsx";

const Backdrop = ({ onTap, children, className }) => {
  const containerClasses = clsx(
    className,
    "fixed inset-0 z-50 overscroll-contain"
  );

  return (
    <motion.section className={containerClasses} onTap={onTap}>
      <motion.div
        key={"backdrop"}
        className="absolute inset-0 bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      {children}
    </motion.section>
  );
};

export default Backdrop;
