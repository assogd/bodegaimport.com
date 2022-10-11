import React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Default, Image, Wine } from "./variations";
import clsx from "clsx";

const Card = ({ slice }) => {
  const { variation } = slice;

  const isText = variation === "default" || variation === "wine";

  const cardClasses = clsx(
    "card rounded relative z-20",
    isText && "px-8 pt-2 pb-8 bg-white",
    variation === "images" && "overflow-hidden"
  );

  return (
    <section className={cardClasses}>
      {variation === "default" ? (
        <Default data={slice} />
      ) : variation === "image" ? (
        <Image data={slice} />
      ) : variation === "wine" ? (
        <Wine data={slice} />
      ) : null}
    </section>
  );
};

export default Card;
