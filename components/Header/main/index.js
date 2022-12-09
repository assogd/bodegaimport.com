import { motion } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";

export default function Header({ settings }) {
  const headerClasses = clsx(
    "text-xl tracking-tight",
    "fixed top-4 sm:top-6 inline-block",
    "left-[50%] translate-x-[-50%] z-20",
    !settings?.alwaysCentered && "sm:left-6 translate-x-0",
    "delay-250 duration-500",
    !settings?.inView && "translate-y-[-200%]"
  );

  const innerClasses = clsx("");

  const variants = {
    outsideView: { opacity: 1, y: "-200%" },
    inView: { opacity: 1, y: 0 },
  };

  return (
    <header className={headerClasses}>
      <motion.div layoutId="mainHeader" className={innerClasses}>
        <Link href="/">
          <a>Bodega Import</a>
        </Link>
      </motion.div>
    </header>
  );

  return (
    <motion.header
      layoutId="mainHeader"
      initial={"outsideView"}
      animate={settings?.inView ? "inView" : "outsideView"}
      variants={variants}
      transition={{ type: "tween", duration: 0.5, delay: 0.25 }}
      className={headerClasses}
    >
      <Link href="/">
        <a>Bodega Import</a>
      </Link>
    </motion.header>
  );
}
