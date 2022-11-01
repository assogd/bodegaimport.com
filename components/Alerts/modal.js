import { motion } from "framer-motion";

const Modal = ({ children }) => {
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
      className="modal hyphens bg-pink relative grid max-h-full max-w-md select-none gap-4 overflow-y-scroll rounded-md text-center"
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
