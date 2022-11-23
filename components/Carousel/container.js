import Card from "../Card";
import { useRef, useState, useEffect } from "react";
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

  return (
    <section className={clsx("carousel", className)}>
      <div className="scrollbar-hide max-w-screen flex max-w-[100vw] snap-x snap-mandatory gap-4 overflow-x-scroll sm:gap-6">
        <Fill />
        {children.map((child, i) => (
          <Observer
            key={i}
            state={[active, setActive]}
            i={i}
            className={
              child.props.altClassName ??
              "shrink-0 basis-4/5 snap-start scroll-mx-8 last:mr-40 sm:basis-56 md:basis-72 lg:basis-96"
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
          active.length === children.length || active.length === 0
            ? "opacity-0"
            : "opacity-1"
        }`}
      >
        {[...Array(children.length)].map((dot, i) => (
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

  useEffect(() => {
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
