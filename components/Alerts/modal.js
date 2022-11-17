import { motion } from "framer-motion";
import clsx from "clsx";

const Modal = ({ children, bg = "bg-pink" }) => {
  const modalVariants = {
    open: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
    closed: {
      y: 50,
      opacity: 0,
      scale: 0.9,
    },
  };

  return (
    <motion.div
      key={"modal"}
      className={clsx(
        "modal hyphens relative grid max-h-full max-w-md select-none gap-4 overflow-y-scroll rounded-md text-center",
        bg
      )}
      initial={"closed"}
      animate={"open"}
      exit={"closed"}
      transition={{ type: "tween", duration: 0.5 }}
      variants={modalVariants}
    >
      {children}
    </motion.div>
  );
};

export default Modal;
