import { motion } from "framer-motion";

export const AnimateInView = ({
  amount = 0,
  children,
  className,
  delay = 0,
  duration = 0.5,
  element,
  skip,
}) => {
  if (skip) return <section className={className}>{children}</section>;

  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: "1em", scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "tween", duration: duration, delay: delay }}
      viewport={{ amount: amount, once: true }}
    >
      {children}
    </motion.section>
  );
};
