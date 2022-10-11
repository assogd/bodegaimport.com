import React from "react";
import { PrismicRichText } from "@prismicio/react";
import { Heading } from "../../components/Heading";

const Region = ({ slice }) => {
  const { title, reference } = slice.primary;
  console.log(slice);
  return (
    <section className="region">
      <header className="sticky top-4 right-4 inline-block">
        <Heading as="h2" size="xl">
          {title}
        </Heading>
      </header>
      {slice.items.map(({ producer }, i) => (
        <section className="producer" key={i}>
          <header className="sticky top-4 right-4 inline-block">
            <Heading as="h3" size="xl">
              {producer.data.title}
            </Heading>
          </header>
        </section>
      ))}
    </section>
  );
};

export default Region;
