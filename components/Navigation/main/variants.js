import { PrismicLink, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { useState, useEffect } from "react";
import clsx from "clsx";
import Button from "../../Button";
import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "../../Backdrop";
import Link from "next/link";
import { useRouter } from "next/router";

export const Collapsible = ({ links, itemsToShow, marquee }) => {
  const [isOpen, setOpen] = useState(false);

  Object.keys(links).forEach(
    (item) => links[item].link.url == "/hem" && (links[item].link.url = "/")
  );

  const navClasses = clsx(
    "sticky inset-x-0 z-30 select-none mt-16",
    marquee ? "bottom-[2.7em] pb-2 " : "bottom-0 pb-4",
    "flex justify-center",
    "bg-gradient-to-t from-black/10"
  );

  return (
    <nav className={navClasses}>
      <div className="flex items-center rounded-lg bg-neutral-100/70 px-4 shadow-glow backdrop-blur">
        <div className="flex h-12 items-center justify-around rounded-lg">
          {links.slice(0, itemsToShow).map((link, i) => (
            <Item key={i} link={link} />
          ))}
        </div>
        {itemsToShow <= links.length - 1 && (
          <div className="flex h-12 items-center">
            <Button size="sm" onTap={() => setOpen(!isOpen)}>
              <ExpandIcon />
            </Button>
          </div>
        )}
      </div>
      <AnimatePresence>
        {isOpen && (
          <Backdrop onTap={() => setOpen(false)}>
            <List>
              {links.map((item) => (
                <ListItem item={item} key={prismicH.asText(item.label)} />
              ))}
            </List>
            <Close onTap={() => setOpen(false)} />
          </Backdrop>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ListItem = ({ item }) => {
  return (
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
  );
};

const List = ({ children }) => {
  const ulClasses = clsx(
    "absolute bottom-0 inset-x-0 text-center mx-auto justify-center gap-4 rounded-t-md overscroll-contain bg-white pb-24 pt-4 max-h-full overflow-y-scroll"
  );

  return (
    <motion.ul
      key={"ul"}
      className={ulClasses}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "tween", duration: ".25" }}
    >
      {children}
    </motion.ul>
  );
};

const Close = ({ onTap }) => {
  const buttonClasses =
    "shadow-easeTop absolute inset-x-0 bottom-0 flex w-full justify-center bg-white pb-8 font-mono uppercase";

  return (
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
      <Button onTap={onTap}>[Stäng]</Button>
    </motion.div>
  );
};

const ExpandIcon = () => (
  <div className="flex h-[0.5em] w-6 translate-y-[2px] flex-col justify-between pl-2">
    <div className="h-[1px] w-full bg-black" />
    <div className="h-[1px] w-full bg-black" />
  </div>
);

const Item = ({ link }) => {
  const [isActive, setActive] = useState(false);
  const { asPath } = useRouter();
  useEffect(() => setActive(link.link.url === asPath), [link.link.url, asPath]);

  return (
    <div className="relative flex h-12 items-center justify-center">
      {isActive && (
        <motion.div
          layoutId="active"
          className="absolute inset-x-2 bottom-3 h-[1px] bg-black sm:inset-x-4"
        />
      )}
      <Link href={link.link.url}>
        <a>
          <Button
            size="sm"
            className="relative whitespace-nowrap py-4 px-2 sm:px-4"
          >
            <PrismicText field={link.label} />
          </Button>
        </a>
      </Link>
    </div>
  );
};
