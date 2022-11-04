import Image from "next/future/image";
import Logotype from "../../../public/BODEGA-IMPORT_LOGOTYPE.svg";

import { useInView } from "react-intersection-observer";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="pointer-events-none fixed inset-x-4 top-0 h-[50vw] select-none sm:relative"
    >
      <div className="sticky top-0 sm:h-[100vh]">
        <div className="flex h-full translate-y-[1em] flex-col items-center justify-center gap-[8vw] py-16 md:translate-y-[-2em] md:gap-[4vw]">
          <Image
            src={Logotype}
            alt={"CFHILL"}
            loading="eager"
            className="mx-auto w-[32vw] sm:w-[16vw]"
          />
          <div className="text-[10vw] tracking-tight sm:text-[5vw]">
            Bodega Import
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export const Observer = ({
  children,
  mainLogotypeInView,
  setMainLogotypeInView,
}) => {
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  });

  useEffect(
    () => setMainLogotypeInView(!inView),
    [inView, mainLogotypeInView, setMainLogotypeInView]
  );

  console.log(inView);

  return (
    <div className="relative">
      <AnimatePresence>{inView && children}</AnimatePresence>
      <div ref={ref} className="observer h-[50vh]" />
    </div>
  );
};
