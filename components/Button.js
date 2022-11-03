import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Backdrop from "../components/Backdrop";

const Button = ({
  children,
  className,
  href,
  size = "md",
  type,
  onTap,
  copy,
  whileTap = { scale: 1, y: 2 },
  disabled,
}) => {
  const [openCopy, setOpenCopy] = useState(false);

  const classes = clsx(
    "inline-flex gap-1 rounded select-none justify-center items-center",
    className,
    size === "md" && "p-2",
    size === "lg" && "p-3 w-full"
  );

  console.log(disabled);

  return (
    <>
      <A href={href}>
        <motion.button
          className={classes}
          whileTap={whileTap}
          onTap={copy ? () => setOpenCopy(!openCopy) : onTap}
          disabled={disabled}
        >
          {children}
          {href && (
            <Image
              src={"/icons/launch.svg"}
              alt={"External link"}
              width="16"
              height="16"
            />
          )}
          {copy && (
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
            backdropStyles="bg-white/30"
            onTap={() => setOpenCopy(false)}
          >
            <div>{copy}</div>
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
