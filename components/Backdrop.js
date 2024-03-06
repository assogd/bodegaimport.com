import { motion } from "framer-motion";
import clsx from "clsx";

const Backdrop = ({ onTap, children, className, bg = "bg-black/70" }) => {
  const containerClasses = clsx(
    className,
    "fixed inset-0 z-50 overscroll-contain max-h-full overflow-y-scroll"
  );

  const backdropClasses = clsx("fixed inset-0 backdrop-blur-lg", bg);

  return (
    <motion.section className={containerClasses} onTap={onTap}>
      <motion.div
        key={"backdrop"}
        className={backdropClasses}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { delay: 0 } }}
      />
      {children}
    </motion.section>
  );
};

export default Backdrop;
