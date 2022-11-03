import { motion } from "framer-motion";
import clsx from "clsx";

const Backdrop = ({
  onTap,
  children,
  className,
  backdropStyles = "bg-black/70",
}) => {
  const containerClasses = clsx(
    className,
    "fixed inset-0 z-50 overscroll-contain"
  );

  const backdropClasses = clsx(
    "absolute inset-0 backdrop-blur-lg",
    backdropStyles
  );

  return (
    <motion.section className={containerClasses} onTap={onTap}>
      <motion.div
        key={"backdrop"}
        className={backdropClasses}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      {children}
    </motion.section>
  );
};

export default Backdrop;
