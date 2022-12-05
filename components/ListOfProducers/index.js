import Header from "../Header/sticky/";
import { Heading } from "../Heading";
import Carousel from "../Carousel/container";
import Card from "../Card";
import * as prismicH from "@prismicio/helpers";

import { useState, useEffect } from "react";
import { Select, Option } from "../Select";
import Button from "../Button";
import useAssoCookie from "../../lib/hooks/useAssoCookie";

import { compSum } from "../../lib/utils";
import clsx from "clsx";

import { WineColor } from "../Card/helpers";
import { motion } from "framer-motion";

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
        {item.producers.map((producer) =>
          view === "rows" ? (
            producer.data.slices
              .filter((f) => f.variation === "wine")
              .map((card, i) => (
                <section
                  key={producer.id}
                  className="flex items-center justify-between gap-2 px-6"
                >
                  <div className="truncate md:basis-48">
                    {prismicH.asText(producer.data.title)}
                  </div>
                  <div className="relative truncate md:grow md:basis-72">
                    <div className="relative inline-block overflow-hidden rounded-full py-1 px-4">
                      <WineColor
                        composition={
                          card.primary.reference.data.grape_composition
                        }
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
                              compSum(
                                card.primary.reference.data.grape_composition
                              )) *
                            100
                          }% ${grape.grape.data.title}`
                      )
                      .join(", ")}
                  </div>
                </section>
              ))
          ) : (
            <section key={producer.id} className="producer">
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
            </section>
          )
        )}
      </section>
    ));
}

const ChangeView = ({ state }) => {
  const [view, setView] = state;
  const [preferences, setPreferences] = useAssoCookie();

  useEffect(() => {
    if (preferences?.consent === "all") {
      setPreferences({ ...preferences, producerView: view });
    } else if (
      preferences?.consent === "onlyRequired" &&
      preferences?.producerView
    ) {
      setPreferences({ ...preferences, producerView: undefined });
    }
  }, [view]);

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

const Toggle = ({ onTap, children, options }) => {
  const width = 2 + options.length * 2;

  console.log(options.active / options.length);

  return (
    <Button
      size="minimal"
      whileTap={{}}
      onTap={onTap}
      className="items-baseline"
    >
      {children}
      <div
        className={clsx(
          `relative ml-[0.125em] box-content h-3 translate-y-[0.025em] rounded-full border-2`,
          `w-${width}`
        )}
      >
        <motion.div
          className="h-3 w-4 rounded-full border-2 bg-black"
          animate={{ x: `${(options.active / options.length) * 100}%` }}
        />
      </div>
    </Button>
  );
};
