import Header from "../Header/sticky/";
import { Heading } from "../Heading";
import Carousel from "../Carousel/container";
import Card from "../Card";
import * as prismicH from "@prismicio/helpers";

import { useState, useEffect } from "react";
import { Select, Option } from "../Select";
import useAssoCookie from "../../lib/hooks/useAssoCookie";

import clsx from "clsx";

import useBreakpoints from "../../lib/hooks/useBreakpoints";

import { AnimatePresence, motion } from "framer-motion";

import Toggle from "../Toggle";
import Row from "../Card/variations/row";

export default function ListOfProducers({ list }) {
  const [preferences, setPreferences] = useAssoCookie();
  const [view, setView] = useState(preferences?.producerView ?? "cards");

  return list
    .filter((a) => a.producers.length > 0)
    .map((item) => (
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
        <ChangeView state={[view, setView]} />
        <AnimatePresence>
          {item.producers.map((producer) =>
            view === "rows" ? (
              producer.data.slices
                .filter((f) => f.variation === "wine")
                .map((card, i) => <Row producer={producer} card={card} />)
            ) : (
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
                <Carousel>
                  {producer.data.slices.map((card, i) => (
                    <Card
                      data={card}
                      size="sm"
                      animate={false}
                      params={{
                        region: {
                          title: `${item.origin.region}, ${item.origin.country}`,
                          slug: item.slug,
                        },
                        producer: {
                          title: producer.data.title,
                          slug: producer.uid,
                        },
                      }}
                    />
                  ))}
                </Carousel>
              </motion.section>
            )
          )}
        </AnimatePresence>
      </section>
    ));
}

const ChangeView = ({ state }) => {
  const [view, setView] = state;
  const [preferences, setPreferences] = useAssoCookie();
  const isSm = useBreakpoints([]).some((n) => n === "sm");

  useEffect(() => {
    if (preferences?.consent === "all") {
      setPreferences({ ...preferences, producerView: isSm ? view : "cards" });
    } else if (
      preferences?.consent === "onlyRequired" &&
      preferences?.producerView
    ) {
      setPreferences({ ...preferences, producerView: undefined });
    }
  }, [view, isSm]);

  if (!isSm) return null;

  return (
    <div className="absolute right-6 top-4 flex items-end gap-2 text-xl tracking-tight sm:top-6">
      <div className="">Vy:</div>
      <Toggle
        onTap={() => setView(view === "cards" ? "rows" : "cards")}
        options={{ active: view === "cards" ? 0 : 1, length: 2 }}
      >
        {view === "cards" ? "Öppen" : "Knuten"}
      </Toggle>
    </div>
  );
};
