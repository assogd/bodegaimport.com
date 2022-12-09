import { WineColor } from "../helpers";
import { motion } from "framer-motion";
import clsx from "clsx";
import { compSum } from "../../../lib/utils";
import * as prismicH from "@prismicio/helpers";
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../../Button";

const Col = ({ className, children }) => {
  return (
    <li className={clsx("shrink-0 truncate leading-[1.1em]", className)}>
      {children}
    </li>
  );
};

const Row = ({ producer, card, i, params }) => {
  const [isHover, setHover] = useState(false);
  const { push } = useRouter();

  return (
    <motion.ul
      className="relative flex w-[72em] cursor-pointer items-center gap-2 py-1 hover:bg-white lg:w-full lg:justify-between"
      key={`row-${producer.id}`}
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { type: "tween", delay: i / 10 },
      }}
      exit={{
        opacity: 0,
        y: -10,
        transition: { type: "tween", delay: i / 10 },
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTap={() =>
        push(`/producent/${params.producer.slug}#${card.uid}`, undefined, {
          shallow: true,
        })
      }
    >
      <Col className="basis-36 pl-6 md:basis-48">
        {prismicH.asText(producer.data.title)}
      </Col>
      <Col className="sticky left-2 flex basis-72 gap-1 self-stretch">
        <div className="relative inline-block rounded-full px-3 pt-[.05em] pb-[.025em]">
          <WineColor composition={card.data.grape_composition} />
          <span className="relative truncate">{card.data.title}</span>
        </div>
        {isHover && <Open />}
      </Col>
      <Col className="basis-60">{card.data.origin}</Col>
      <Col className="basis-80 pr-6">
        {card.data.grape_composition
          .map((grape, i) => `${grape?.grape?.data.title}`)
          .join(", ")}
      </Col>
    </motion.ul>
  );
};

export default Row;

const Open = () => {
  const { push } = useRouter();

  return (
    <Button
      className="mt-[0.125em] rounded-md px-1 font-mono text-sm uppercase leading-4"
      size="mini"
    >
      +Info
    </Button>
  );
};
