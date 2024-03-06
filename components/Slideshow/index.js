import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { useHotkeys } from "react-hotkeys-hook";
import Backdrop from "../Backdrop";
import { Context } from "../../lib/context";
import Asset from "./asset";
import { Dot, Dots, Control } from "./controls";
import Button from "../Button";
import { useLockBodyScroll } from "@uidotdev/usehooks";

const Slideshow = () => {
  const { settings, settingsHandler } = useContext(Context);
  const [inView, setInView] = useState(0);
  const close = () => {
    settingsHandler({ ...settings, slideshow: {} });
    setInView(0);
  };
  const { items } = settings?.slideshow ?? { items: [] };

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) =>
      inView + 1 !== items?.length && setInView(inView + 1),
    onSwipedRight: (eventData) => inView > 0 && setInView(inView - 1),
    onSwipedUp: close,
    onSwipedDown: close,
    preventScrollOnSwipe: true,
  });

  useHotkeys("left", () => inView > 0 && setInView(inView - 1), [inView]);

  useHotkeys(
    "right",
    () => inView + 1 < items?.length && setInView(inView + 1),
    [inView]
  );

  useHotkeys("esc", close, [inView]);

  return (
    <AnimatePresence key={"container"}>
      {items?.length > 0 && (
        <Backdrop className="" bg={"bg-black/80"}>
          <motion.section
            className={"relative h-full overflow-hidden"}
            {...handlers}
            key={"slideshow"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {items.map((item, i) => (
              <Asset
                key={i}
                data={item}
                priority={i === 0}
                inView={i === inView}
                dir={i > inView ? "100%" : "-100%"}
              />
            ))}
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
              disabled={inView + 1 === items?.length}
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
          <LockBody />
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

const LockBody = () => useLockBodyScroll();

export default Slideshow;
