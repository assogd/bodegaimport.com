import Card from "../Card";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../Button";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";

export default function Carousel({ data, params }) {
  const [active, setActive] = useState([]);
  const refs = useRef([]);

  const scrollTo = (i) =>
    refs.current[i].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });

  return (
    <section className="carousel">
      <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-scroll">
        <div className="basis-40 snap-center" />
        {data.map((card, i) => (
          <div
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="w-5/6 shrink-0 basis-auto snap-center scroll-mx-12 md:w-96"
          >
            <Observer state={[active, setActive]} i={i}>
              <Card
                key={card.id}
                data={card}
                size="sm"
                animate={false}
                params={params}
              />
            </Observer>
          </div>
        ))}
        <div className="basis-40 snap-center" />
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
    threshold: 0.75,
  });
  const [active, setActive] = state;

  useEffect(() => {
    if (inView && !active.some((a) => a === i)) {
      setActive([...active, i]);
    } else if (!inView && active.some((a) => a === i)) {
      setActive(active.filter((a) => a != i));
    }
  }, [inView, active]);

  return <div ref={ref}>{children}</div>;
};

const Dot = ({ i, onTap, active }) => {
  const dotClasses = clsx(
    "h-[.4rem] w-[.4rem] rounded-full border",
    active && "bg-black"
  );
  return (
    <Button onTap={onTap}>
      <motion.div className={dotClasses} />
    </Button>
  );
};
