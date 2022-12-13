import Header from "../Header/base/";
import { Heading } from "../Heading";
import Carousel from "../Carousel/container";
import Card from "../Card";
import * as prismicH from "@prismicio/helpers";

import { useState, useEffect, useLayoutEffect } from "react";
import { Select, Option } from "../Select";
import useAssoCookie from "../../lib/hooks/useAssoCookie";

import clsx from "clsx";

import useBreakpoints from "../../lib/hooks/useBreakpoints";

import { AnimatePresence, motion } from "framer-motion";

import Toggle from "../Toggle";

import { Region, Producer } from "./headers";
import Row from "../Card/variations/row";

import { generateKey } from "../../lib/utils";

export default function ListOfProducers({ list, wines }) {
  const [preferences, setPreferences] = useAssoCookie();
  const [view, setView] = useState("cards");

  useLayoutEffect(() => {
    preferences?.producerView && setView(preferences.producerView);
  }, [preferences, setView]);

  return (
    <>
      <ChangeView state={[view, setView]} />
      {list.map((item, i) => (
        <Region key={generateKey + i} item={item} view={view}>
          <AnimatePresence>
            {item.producers.map((producer, b) => (
              <Item
                key={generateKey + b}
                view={view}
                producer={producer}
                region={item}
                wines={wines.filter((a) => a.data.producer.id === producer.id)}
              />
            ))}
          </AnimatePresence>
        </Region>
      ))}
    </>
  );
}

const Item = ({ view, producer, region, wines }) => {
  const slicedWines = producer.data.slices
    .filter((a) => a.variation === "wine")
    .map((b) => b.primary.reference.id);

  const unfilteredWines = wines.filter((a) =>
    slicedWines.some((b) => b != a.id)
  );

  const set = producer.data.slices.concat(unfilteredWines);

  if (view === "rows")
    return (
      <>
        {set
          .filter((f) => f.variation === "wine" || f.type === "wine")
          .map((card, i) => (
            <Row
              producer={producer}
              card={card?.type ? card : card?.primary?.reference}
              i={i}
              params={params(region, producer)}
              key={card.id}
            />
          ))}
      </>
    );

  return (
    <Producer producer={producer}>
      <Carousel>
        {set.map((card, i) => (
          <Card
            data={card}
            size="sm"
            animate={false}
            params={params(region, producer)}
            key={card.id}
          />
        ))}
      </Carousel>
    </Producer>
  );
};

const ChangeView = ({ state }) => {
  const [view, setView] = state;
  const [preferences, setPreferences] = useAssoCookie();
  const render = useBreakpoints([]).some((n) => n === "lg");

  useLayoutEffect(() => {
    if (preferences?.consent === "all") {
      setPreferences({ ...preferences, producerView: render ? view : "cards" });
    } else if (
      preferences?.consent === "onlyRequired" &&
      preferences?.producerView
    ) {
      setPreferences({ ...preferences, producerView: undefined });
    }
  }, [view, render]);

  if (!render) return null;

  return (
    <div className="absolute right-6 top-4 flex items-end gap-2 text-xl tracking-tight sm:top-5">
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

const params = (item, producer) => ({
  region: {
    title: `${item.origin.region}, ${item.origin.country}`,
    slug: item.slug,
  },
  producer: {
    title: producer.data.title,
    slug: producer.uid,
  },
});
