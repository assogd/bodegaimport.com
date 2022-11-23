import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Backdrop from "../components/Backdrop";
import copy from "copy-to-clipboard";

const Button = ({
  children,
  className,
  href,
  size = "md",
  type,
  onTap,
  copyText,
  whileTap = { scale: 1, y: 2 },
  disabled,
}) => {
  const [openCopy, setOpenCopy] = useState(false);
  const isMono = className && className.includes("font-mono");

  console.log(isMono);

  const classes = clsx(
    "inline-flex gap-1 rounded-md select-none justify-center items-center",
    className,
    size === "sm" && "py-2 px-2",
    size === "md" && "py-3 px-6 sm:px-5",
    size === "lg" && "p-3 w-full"
  );

  return (
    <>
      <A href={href}>
        <motion.button
          className={classes}
          whileTap={whileTap}
          onTap={copyText ? () => setOpenCopy(!openCopy) : onTap}
          disabled={disabled}
        >
          {children}
          {href && !isMono && <External />}
          {href && isMono && <ExternalMono />}
          {copyText && (
            <Image
              src={"/icons/copy.svg"}
              alt={"Copy"}
              width="16"
              height="16"
            />
          )}
        </motion.button>
      </A>
      <AnimatePresence>
        {openCopy && (
          <Backdrop
            bg="bg-white/60"
            onTap={() => {
              copy(copyText);
              setOpenCopy(false);
            }}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex max-w-lg flex-col gap-4">
                <div className="text-lg">{copyText}</div>
                <Button size="lg" className="bg-paleYellow">
                  Kopiera
                  <Image
                    src={"/icons/copy.svg"}
                    alt={"Copy"}
                    width="16"
                    height="16"
                  />
                </Button>
              </div>
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 m-4">
              <Button
                size="md"
                className="border"
                onTap={() => {
                  setOpenCopy(false);
                }}
              >
                Stäng
              </Button>
            </div>
          </Backdrop>
        )}
      </AnimatePresence>
    </>
  );
};

export default Button;

const A = ({ children, href }) => {
  if (!href) return children;

  return (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  );
};

const External = () => (
  <Image
    src={"/icons/launch.svg"}
    alt={"External link"}
    width="16"
    height="16"
  />
);

const ExternalMono = () => (
  <span className="ml-1 translate-y-[-.1em] rotate-[-45deg] tracking-tighter">
    =&gt;
  </span>
);
