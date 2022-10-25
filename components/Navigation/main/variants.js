import { PrismicLink, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { useState } from "react";
import clsx from "clsx";
import Button from "../../Button";
import { AnimatePresence, motion } from "framer-motion";

export const Collapsible = ({ links }) => {
  const [isOpen, setOpen] = useState(false);

  const navClasses =
    "fixed inset-x-0 bottom-12 z-50 flex justify-center select-none";

  const ulClasses = clsx(
    "absolute bottom-0 inset-x-0 text-center mx-auto justify-center gap-4 rounded-md overscroll-contain bg-white pb-20 pt-4 max-h-full overflow-y-scroll"
  );

  const buttonClasses =
    "shadow-easeTop absolute inset-x-0 bottom-0 flex w-full justify-center bg-white pb-8 font-mono uppercase";

  return (
    <nav className={navClasses}>
      <Button
        className="shadow-glow rounded-lg bg-white px-8 py-3 font-mono uppercase"
        onTap={() => setOpen(!isOpen)}
      >
        Meny ///
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 overscroll-contain"
            onTap={() => setOpen(false)}
          >
            <Cover onTap={() => setOpen(false)} />
            <motion.ul
              key={"ul"}
              className={ulClasses}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: ".25" }}
            >
              {links.map((item) => (
                <motion.li
                  key={prismicH.asText(item.label)}
                  className="whitespace-nowrap text-xl"
                  initial={{ opacity: 0, y: ".25em" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: ".25em" }}
                  transition={{ type: "tween", delay: 0.25, duration: 0.5 }}
                >
                  <PrismicLink field={item.link} className="block w-full p-6">
                    <PrismicText field={item.label} />
                  </PrismicLink>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              key={"close"}
              initial={{ y: ".25em", opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { delay: 0.25, type: "tween", duration: 0.5 },
              }}
              exit={{ y: ".25em", opacity: 0 }}
              transition={{ type: "tween" }}
              className={buttonClasses}
            >
              <Button onTap={() => setOpen(false)}>[Stäng]</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Cover = ({ onTap }) => (
  <motion.div
    key={"cover"}
    className="absolute inset-0 -z-10 bg-black/60"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onTap={onTap}
  />
);
