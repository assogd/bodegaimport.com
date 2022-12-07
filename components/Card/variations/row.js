import { WineColor } from "../helpers";
import { motion } from "framer-motion";
import clsx from "clsx";
import { compSum } from "../../../lib/utils";
import * as prismicH from "@prismicio/helpers";

const Row = ({ producer, card, i }) => {
  console.log(card);

  return (
    <motion.section
      className="flex items-center justify-between gap-2 px-6"
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
    >
      <div className="truncate md:basis-48">
        {prismicH.asText(producer.data.title)}
      </div>
      <div className="relative truncate md:grow md:basis-72">
        <div className="relative inline-block overflow-hidden rounded-full py-1 px-4">
          <WineColor composition={card.grape_composition} />
          <span className="relative truncate">{card.title}</span>
        </div>
      </div>
      <div className="hidden truncate md:basis-48 lg:block">{card.origin}</div>
      <div className="hidden truncate text-right md:block md:basis-72">
        {card.grape_composition
          .map((grape, i) => `${grape?.grape?.data.title}`)
          .join(", ")}
      </div>
    </motion.section>
  );
};

export default Row;
