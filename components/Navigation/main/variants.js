import { PrismicLink, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { useState } from "react";
import clsx from "clsx";
import Button from "../../Button";
import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "../../Backdrop";
import Link from "next/link";

export const Collapsible = ({ links }) => {
  const [isOpen, setOpen] = useState(false);

  const navClasses =
    "fixed inset-x-0 bottom-12 z-30 flex justify-center select-none";

  const ulClasses = clsx(
    "absolute bottom-0 inset-x-0 text-center mx-auto justify-center gap-4 rounded-md overscroll-contain bg-white pb-20 pt-4 max-h-full overflow-y-scroll"
  );

  const buttonClasses =
    "shadow-easeTop absolute inset-x-0 bottom-0 flex w-full justify-center bg-white pb-8 font-mono uppercase";

  return (
    <nav className={navClasses}>
      <div className="flex items-center rounded-lg bg-white px-2 shadow-glow">
        {links.slice(0, 3).map((link, i) => (
          <div key={i}>
            <Link href={link.link.url}>
              <Button className="relative py-4 px-4">
                <PrismicText field={link.label} />
              </Button>
            </Link>
          </div>
        ))}
        <div className="flex items-center">
          <Button onTap={() => setOpen(!isOpen)}>
            <ExpandIcon />
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <Backdrop onTap={() => setOpen(false)}>
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
                  transition={{ type: "tween", delay: 0, duration: 0.5 }}
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
          </Backdrop>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ExpandIcon = () => (
  <div className="flex h-4 w-8 flex-col justify-between px-2">
    <div className="h-[1px] w-full bg-black" />
    <div className="h-[1px] w-full bg-black" />
    <div className="h-[1px] w-full bg-black" />
  </div>
);
