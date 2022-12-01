import Header from "../Header/sticky/";
import { Heading } from "../Heading";
import Carousel from "../Carousel/container";
import Card from "../Card";
import * as prismicH from "@prismicio/helpers";

import { useState } from "react";
import { Select, Option } from "../Select";
import Button from "../Button";

export default function ListOfProducers({ list }) {
  const [view, setView] = useState("cards");

  return list
    .filter((a) => a.producers.length > 0)
    .map((item) => (
      <section key={item.slug} className="region mb-12 w-full">
        <Header className="sticky top-12 right-0 w-full px-4 text-center sm:top-6 sm:text-right">
          <Heading as="h2" size="xl">
            {item.origin.region}, {item.origin.country}
          </Heading>
        </Header>
        {item.producers.map((producer) => (
          <section key={producer.id} className="producer">
            <Header
              className="sticky inset-x-0 top-[3.25em] p-8 text-center sm:top-8"
              secondLevel={true}
            >
              <Heading as="h2" size="xl">
                {prismicH.asText(producer.data.title)}
              </Heading>
            </Header>
            <ChangeView state={[view, setView]} />
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
        ))}
      </section>
    ));
}

const ChangeView = ({ state }) => {
  const [view, setView] = state;
  return (
    <div className="absolute right-6 top-4 flex items-end gap-2 text-xl tracking-tight sm:top-6">
      <div className="">Vy:</div>
      <Button
        size="minimal"
        whileTap={{}}
        onTap={() => setView(view === "cards" ? "rows" : "cards")}
      >
        {view === "cards" ? "Öppen" : "Knuten"}
      </Button>
    </div>
  );
};
