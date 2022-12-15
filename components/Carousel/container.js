import Card from "../Card";
import { useRef, useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import Button from "../Button";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";

export default function Carousel({ params, className, children }) {
  const [active, setActive] = useState([]);
  const refs = useRef([]);

  const scrollTo = (i) =>
    refs.current[i].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });

  if (!children?.length) return null;

  return (
    <section className={clsx("carousel", className)}>
      <div className="scrollbar-hide max-w-screen flex max-w-[100vw] snap-x snap-mandatory gap-4 overflow-x-scroll sm:gap-4">
        <Fill />
        {children &&
          children.map((child, i) => (
            <Observer
              key={i}
              state={[active, setActive]}
              i={i}
              className={
                child?.props?.altclassname ??
                "relative w-4/5 shrink-0 grow-0 basis-4/5 snap-center last:mr-40 sm:w-72 sm:basis-72"
              }
            >
              <div
                ref={(el) => {
                  refs.current[i] = el;
                }}
                onClick={() => scrollTo(i)}
              >
                {child}
              </div>
            </Observer>
          ))}
        <Fill />
      </div>
      <div
        className={`m-4 flex max-w-full flex-wrap justify-center overflow-hidden transition-opacity ${
          active.length === children?.length || active.length === 0
            ? "opacity-0"
            : "opacity-1"
        }`}
      >
        {[...Array(children?.length)].map((dot, i) => (
          <Dot
            key={i}
            onTap={() => scrollTo(i)}
            active={active.some((a) => a === i)}
          />
        ))}
      </div>
    </section>
  );
}

const Observer = ({ state, children, i, className }) => {
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  });
  const [active, setActive] = state;

  useLayoutEffect(() => {
    if (inView && !active.some((a) => a === i)) {
      setActive([...active, i]);
    } else if (!inView && active.some((a) => a === i)) {
      setActive(active.filter((a) => a != i));
    }
  }, [inView, active, i, setActive]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

const Dot = ({ i, onTap, active }) => {
  const dotClasses = clsx(
    "h-[.4rem] w-[.4rem] rounded-full border",
    active && "bg-black"
  );
  return (
    <Button size="sm" onTap={onTap}>
      <motion.div className={dotClasses} />
    </Button>
  );
};

const Fill = () => <div className="shrink-0 grow basis-2" />;
