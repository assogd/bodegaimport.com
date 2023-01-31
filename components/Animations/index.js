import { motion } from "framer-motion";
import clsx from "clsx";

export const AnimateInView = ({
  amount = 0,
  children,
  className,
  delay = 0,
  duration = 0.5,
  element,
  skip,
  id,
}) => {
  if (skip) return <section className={className}>{children}</section>;

  return (
    <motion.section
      id={id}
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

export const LoadingAssetAnimation = ({ className, children, loaded }) => {
  if (loaded) return children;

  return (
    <div className={clsx("h-full animate-pulse rounded-sm bg-black/10")}>
      <div
        className={clsx(
          "h-full duration-300",
          loaded ? "opacity-1" : "opacity-0",
          className
        )}
      >
        <div className="absolute inset-x-4 bottom-4 h-3 rounded-md bg-white/30" />
        <div className="absolute inset-x-4 bottom-10 h-3 rounded-md bg-white/30" />
        {children}
      </div>
    </div>
  );
};
