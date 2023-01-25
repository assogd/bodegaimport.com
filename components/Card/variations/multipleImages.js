import clsx from "clsx";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/future/image";
import { LoadingAssetAnimation } from "../../Animations";
import Button from "../../Button";

import Backdrop from "../Backdrop";

const Asset = ({ data, size, priority }) => {
  const [loaded, setLoaded] = useState(false);
  const { file, caption } = data;

  return (
    <motion.figure
      key={file.url}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LoadingAssetAnimation loaded={true} duration={100}>
        <Image
          src={file.portrait_lg.url}
          width={file.portrait_lg.dimensions.width}
          height={file.portrait_lg.dimensions.height}
          alt={file.alt ?? "Ingen beskrivning tillgänglig"}
          className={clsx(
            "align-text-bottom",
            size === "sm" && "h-full object-cover"
          )}
          priority={priority}
          onLoadingComplete={(e) => setLoaded(true)}
        />
      </LoadingAssetAnimation>
    </motion.figure>
  );
};

const Control = ({ onTap, disabled, className, children }) => {
  const [hover, setHover] = useState(false);
  if (disabled) return null;

  return (
    <motion.div
      className={clsx(
        "absolute inset-y-0 flex w-1/2 items-center font-mono uppercase text-white",
        className,
        !hover && "from-black/0"
      )}
      onTap={onTap}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && (
        <Button onTap={onTap} size="sm">
          {children}
        </Button>
      )}
    </motion.div>
  );
};

const Dots = ({ children }) => {
  return (
    <div
      className={`absolute inset-x-0 bottom-0 flex max-w-full justify-center bg-gradient-to-t from-black/40 p-4`}
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
          className="translate-y-[-0em] translate-x-[-.5em]"
          size="sm"
        />
        {children}
      </Button>
    </div>
  );
};

const Slideshow = ({ items }) => {
  const [inView, setInView] = useState(0);

  return (
    <Backdrop className="flex flex-col items-center" bg={"bg-purple/40"}>
      <section className={""}>
        <AnimatePresence mode="wait">
          {items.map(
            (item, i) =>
              i === inView && <Asset key={i} data={item} priority={i === 0} />
          )}
        </AnimatePresence>
        <Control
          className={"left-0 justify-start bg-gradient-to-r from-black/40"}
          onTap={() => setInView(inView - 1)}
          disabled={inView === 0}
        >
          [&lt;]
        </Control>
        <Control
          className={"right-0 justify-end bg-gradient-to-l from-black/40 "}
          onTap={() => setInView(inView + 1)}
          disabled={inView + 1 === data.items.length}
        >
          [&gt;]
        </Control>
        <Dots>
          {items.map((dot, i) => (
            <Dot key={i} onTap={() => setInView(i)} active={i === inView} />
          ))}
        </Dots>
      </section>
    </Backdrop>
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
      <Slideshow items={data.items} />
    </>
  );
}
