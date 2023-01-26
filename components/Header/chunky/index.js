import Image from "next/future/image";
import Logotype from "../../../public/BODEGA-IMPORT_LOGOTYPE.svg";

import { useInView } from "react-intersection-observer";
import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect } from "react";
import useBreakpoints from "../../../lib/hooks/useBreakpoints";

export function Header() {
  return (
    <>
      <Observer>
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none fixed inset-x-4 top-4 h-[50vh] select-none md:relative md:inset-0 md:h-full"
        >
          <div className="sticky top-[50%] max-h-screen translate-y-[-12%] md:translate-y-[-50%]">
            <div className="flex h-full flex-col items-center justify-center gap-[8vw] md:h-full md:translate-y-[-5vh] md:gap-[4vw]">
              <Image
                src={Logotype}
                alt={"Bodega Import"}
                priority
                className="mx-auto h-auto w-[50vw] md:w-[16vw]"
              />
              <div className="text-[10vw] tracking-tight md:text-[5vw]">
                Bodega Import
              </div>
            </div>
          </div>
        </motion.header>
      </Observer>
    </>
  );
}

export const Observer = ({
  children,
  mainLogotypeInView,
  setMainLogotypeInView,
}) => {
  const isMd = useBreakpoints([]).some((n) => n === "md");

  const { ref, inView, entry } = useInView({
    threshold: isMd ? 0 : 0.5,
  });

  return (
    <div className="relative">
      <AnimatePresence>{(inView || isMd) && children}</AnimatePresence>
      <div
        ref={ref}
        className="observer inset-0 h-[50vh] md:absolute md:h-auto"
      />
    </div>
  );
};
