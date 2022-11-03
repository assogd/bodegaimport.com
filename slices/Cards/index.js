import React from "react";
import { PrismicRichText } from "@prismicio/react";

const Cards = ({ slice }) => {
  console.log(slice);
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
    </section>
  );
};

export default Cards;
