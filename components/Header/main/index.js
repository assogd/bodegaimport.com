import { motion } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";

export default function Header({ settings }) {
  const headerClasses = clsx(
    "fixed top-4 sm:top-6 left-6 right-6 z-20",
    "text-xl tracking-tight text-center",
    !settings?.alwaysCentered && "sm:right-auto"
  );

  const variants = {
    outsideView: { opacity: 1, y: "-200%" },
    inView: { opacity: 1, y: 0 },
  };

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
