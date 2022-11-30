import { AnimatePresence, motion } from "framer-motion";
import { generateKey } from "../lib/utils";

export default function Section({ className, children }) {
  return (
    <motion.section
      key={generateKey}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.section>
  );
}
