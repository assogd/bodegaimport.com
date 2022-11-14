import Image from "next/future/image";
import Logotype from "../../../public/BODEGA-IMPORT_LOGOTYPE.svg";

import { useInView } from "react-intersection-observer";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import useBreakpoints from "../../../lib/hooks/useBreakpoints";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="pointer-events-none fixed inset-x-4 top-4 h-[50vh] select-none sm:relative sm:inset-0 sm:h-full"
    >
      <div className="sticky top-[50%] max-h-screen translate-y-[-50%]">
        <div className="flex h-full flex-col items-center justify-center gap-[8vw] sm:h-full sm:translate-y-[-2em] sm:gap-[4vw]">
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
  const isSm = useBreakpoints([]).some((n) => n === "sm");

  const { ref, inView, entry } = useInView({
    threshold: isSm ? 0 : 0.5,
  });

  useEffect(
    () => setMainLogotypeInView(!inView),
    [inView, mainLogotypeInView, setMainLogotypeInView]
  );

  return (
    <div className="relative">
      <AnimatePresence>{(inView || isSm) && children}</AnimatePresence>
      <div
        ref={ref}
        className="observer inset-0 h-[50vh] sm:h-auto sm:absolute"
      />
    </div>
  );
};
