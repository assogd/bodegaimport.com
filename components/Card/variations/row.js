import { WineColor } from "../helpers";
import { motion } from "framer-motion";
import clsx from "clsx";
import { compSum } from "../../../lib/utils";
import * as prismicH from "@prismicio/helpers";

const Row = ({ producer, card }) => {
  return (
    <motion.section
      className="flex items-center justify-between gap-2 px-6"
      key={`row-${producer.id}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ type: "tween" }}
    >
      <div className="truncate md:basis-48">
        {prismicH.asText(producer.data.title)}
      </div>
      <div className="relative truncate md:grow md:basis-72">
        <div className="relative inline-block overflow-hidden rounded-full py-1 px-4">
          <WineColor
            composition={card.primary.reference.data.grape_composition}
          />
          <span className="relative truncate">
            {card.primary.reference.data.title}
          </span>
        </div>
      </div>
      <div className="hidden truncate md:basis-48 lg:block">
        {card.primary.reference.data.origin}
      </div>
      <div className="hidden truncate text-right md:block md:basis-72">
        {card.primary.reference.data.grape_composition
          .map(
            (grape, i) =>
              `${
                (grape.density /
                  compSum(card.primary.reference.data.grape_composition)) *
                100
              }% ${grape.grape.data.title}`
          )
          .join(", ")}
      </div>
    </motion.section>
  );
};

export default Row;
