import clsx from "clsx";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/future/image";
import { LoadingAssetAnimation } from "../../Animations";
import Button from "../../Button";

import { useSwipeable } from "react-swipeable";
import { useHotkeys } from "react-hotkeys-hook";

import { PrismicRichText } from "@prismicio/react";

import Backdrop from "../../Backdrop";

const Caption = ({ data }) => {
  if (!data.length) return null;

  return (
    <figcaption className="absolute inset-x-0 bottom-0 rounded-md bg-gradient-to-t from-black/20 p-4 text-center font-mono text-sm text-white">
      <div className="mx-auto max-w-4xl">
        <PrismicRichText field={data} />
      </div>
    </figcaption>
  );
};

const Asset = ({ data, priority, inView, dir }) => {
  const [loaded, setLoaded] = useState(false);
  const ratio = data.file.dimensions.width / data.file.dimensions.height;
  const isPortrait = data.file.dimensions.width < data.file.dimensions.height;
  const { url, dimensions, alt } = isPortrait
    ? data.file.portrait_lg
    : data.file.landscape_lg;

  return (
    <motion.figure
      key={url}
      initial={{ opacity: 0, x: priority || inView ? 0 : "100%" }}
      animate={{
        opacity: 1,
        x: inView ? 0 : dir,
      }}
      exit={{ opacity: 0 }}
      className="absolute inset-0"
      transition={{ type: "tween" }}
    >
      <LoadingAssetAnimation loaded={loaded} duration={100}>
        <Image
          src={url}
          width={dimensions.width}
          height={dimensions.height}
          alt={alt ?? "Ingen beskrivning tillgänglig"}
          className={clsx("h-full object-contain align-text-bottom")}
          priority={priority}
          onLoadingComplete={(e) => setLoaded(true)}
        />
      </LoadingAssetAnimation>
      <Caption data={data.caption} />
    </motion.figure>
  );
};

const Control = ({ onTap, disabled, className, children }) => {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      className={clsx(
        "absolute inset-y-0 flex w-36 items-center p-2 font-mono uppercase text-white sm:p-4",
        className,
        !hover && "from-black/0"
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {
        <Button
          onTap={!disabled && onTap}
          size="sm"
          className={clsx(
            "h-12 w-12 rounded-full text-[2em]",
            disabled ? "" : "bg-black/20"
          )}
          whileHover={{ scale: 1.1 }}
          disabled={disabled}
        >
          <span className="translate-y-[.05em]">{children}</span>
        </Button>
      }
    </motion.div>
  );
};

const Dots = ({ children }) => {
  return (
    <div
      className={`absolute inset-x-0 top-0 flex max-w-full justify-start bg-gradient-to-b from-black/20 py-6 pl-6 pr-24 sm:justify-center sm:pl-24`}
    >
      {children}
    </div>
  );
};

const Dot = ({ i, onTap, active }) => {
  const dotClasses = clsx(
    "h-[.4rem] w-[.4rem] rounded-full border border-white",
    active && "bg-white"
  );
  return (
    <Button size="sm" onTap={onTap}>
      <motion.div className={dotClasses} />
    </Button>
  );
};

const Expand = ({ children, onTap }) => {
  return (
    <div className="absolute inset-x-0 bottom-0 flex max-w-full justify-start bg-gradient-to-t from-black/40 p-4">
      <Button onTap={onTap} className="flex items-center bg-white">
        <Image
          src={"/icons/photo_library.svg"}
          alt={"Photo library"}
          width="24"
          height="24"
          className="ml-[-.5em] mr-[.25em]"
          size="sm"
        />
        {children}
      </Button>
    </div>
  );
};

const Slideshow = ({ items, render, close }) => {
  const [inView, setInView] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) =>
      inView + 1 !== items.length && setInView(inView + 1),
    onSwipedRight: (eventData) => inView > 0 && setInView(inView - 1),
    onSwipedUp: close,
    onSwipedDown: close,
    preventScrollOnSwipe: true,
  });

  useHotkeys("left", () => inView > 0 && setInView(inView - 1), [inView]);

  useHotkeys(
    "right",
    () => inView + 1 < items.length && setInView(inView + 1),
    [inView]
  );

  useHotkeys("esc", close, [inView]);

  return (
    <AnimatePresence>
      {render && (
        <Backdrop className="" bg={"bg-black/80"}>
          <motion.section
            className={"relative h-full overflow-hidden"}
            {...handlers}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AnimatePresence>
              {items.map((item, i) => (
                <Asset
                  key={i}
                  data={item}
                  priority={i === 0}
                  inView={i === inView}
                  dir={i > inView ? "100%" : "-100%"}
                />
              ))}
            </AnimatePresence>
            <Control
              className={"left-0 justify-start bg-gradient-to-r from-black/20"}
              onTap={() => setInView(inView - 1)}
              disabled={inView === 0}
            >
              &lt;
            </Control>
            <Control
              className={"right-0 justify-end bg-gradient-to-l from-black/0 "}
              onTap={() => setInView(inView + 1)}
              disabled={inView + 1 === items.length}
            >
              &gt;
            </Control>
            <Dots>
              {items.map((dot, i) => (
                <Dot key={i} onTap={() => setInView(i)} active={i === inView} />
              ))}
            </Dots>
            <Button
              onTap={close}
              size="md"
              className="absolute right-0 m-4 bg-black/20 font-mono text-[2em] text-white"
              whileHover={{ scale: 1.1 }}
            >
              <span className="translate-y-[.05em]">Stäng</span>
            </Button>
          </motion.section>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default function MultipleImages({ data, size, aboveFold }) {
  const [overlay, setOverlay] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const containerClasses = clsx(
    "overflow-hidden rounded bg-white h-full",
    size === "sm" ? "absolute inset-0" : "sticky top-14"
  );
  const { url, dimensions, alt } = data.items[0].file.portrait_lg;

  return (
    <>
      <figure className={containerClasses}>
        <LoadingAssetAnimation loaded={loaded}>
          <Image
            src={url}
            width={dimensions.width}
            height={dimensions.height}
            alt={alt ?? "Ingen beskrivning tillgänglig"}
            className={clsx(
              "h-full object-cover align-text-bottom",
              size === "sm" && "h-full object-cover"
            )}
            priority={aboveFold}
            onLoadingComplete={(e) => setLoaded(true)}
          />
          <Expand onTap={() => setOverlay(true)}>
            {data.items.length > 1 ? `${data.items.length} bilder` : `Förstora`}
          </Expand>
        </LoadingAssetAnimation>
      </figure>
      <Slideshow
        items={data.items}
        render={overlay}
        close={() => {
          setOverlay(false);
        }}
      />
    </>
  );
}
