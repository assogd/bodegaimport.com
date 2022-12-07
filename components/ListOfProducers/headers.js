import Header from "../Header/sticky/";
import { Heading } from "../Heading";

import clsx from "clsx";
import { motion } from "framer-motion";
import * as prismicH from "@prismicio/helpers";

export const Region = ({ children, item, view }) => {
  return (
    <section key={item.slug} className={clsx("region mb-12 w-full")}>
      <Header
        className={clsx(
          "sticky top-12 right-0 w-full px-6 text-center sm:top-6 sm:text-right",
          view === "rows" && "mb-8"
        )}
      >
        <Heading as="h2" size="xl">
          {item.origin.region}, {item.origin.country}
        </Heading>
      </Header>
      {children}
    </section>
  );
};

export const Producer = ({ children, producer, view }) => {
  return (
    <motion.section
      className="producer"
      key={`card-${producer.id}`}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ type: "tween" }}
    >
      <Header
        className="sticky inset-x-0 top-[3.25em] p-8 text-center sm:top-[1.8em] xl:top-[2.4vw]"
        secondLevel={true}
      >
        <Heading as="h2" size="xl">
          {prismicH.asText(producer.data.title)}
        </Heading>
      </Header>
      {children}
    </motion.section>
  );
};
