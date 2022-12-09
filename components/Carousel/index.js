import Card from "../Card";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../Button";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";

export default function Carousel({ data, params, className }) {
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
      <div className="scrollbar-hide max-w-screen flex max-w-[100vw] snap-x snap-mandatory gap-4 overflow-x-scroll">
        <Fill />
        {data.map((card, i) => (
          <div
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="w-5/6 shrink-0 grow-0 basis-auto snap-center scroll-mx-12 sm:w-72"
          >
            <Observer state={[active, setActive]} i={i}>
              <Card data={card} size="sm" animate={false} params={params} />
            </Observer>
          </div>
        ))}
        <Fill />
      </div>
      <div
        className={`flex justify-center p-4 transition-opacity ${
          active.length === data.length || active.length === 0
            ? "opacity-0"
            : "opacity-1"
        }`}
      >
        {data.map((dot, i) => (
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

const Observer = ({ state, children, i }) => {
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

  return <div ref={ref}>{children}</div>;
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
