import React from "react";
import { PrismicRichText } from "@prismicio/react";
import ContactCard from "./contact";

const Cards = ({ slice }) => {
  return (
    <section className={`cards ${slice.variation}`}>
      <header className="text-center">
        {slice.primary.title && <PrismicRichText field={slice.primary.title} />}
        {slice.primary.introduction && (
          <div className="hyphens mx-auto max-w-4xl">
            <PrismicRichText field={slice.primary.introduction} />
          </div>
        )}
      </header>
      <div className="mx-auto mt-4 grid max-w-5xl justify-center gap-4 p-4 sm:grid-cols-3 md:px-[5%]">
        {slice.variation === "contact" &&
          slice.items.map((item, i) => <ContactCard key={i} data={item} />)}
      </div>
    </section>
  );
};

export default Cards;
