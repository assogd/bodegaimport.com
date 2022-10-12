import React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Default, Image, Wine } from "./variations";
import clsx from "clsx";
import { camelCase } from "../../lib/utils/text";

const Card = ({ slice }) => {
  const { variation } = slice;

  const isText = variation === "default" || variation === "wine";
  const bgColor = slice?.primary?.reference?.data?.color
    ? `bg-${camelCase(slice?.primary?.reference?.data?.color)}`
    : "bg-white";

  const cardClasses = clsx(
    "card rounded relative z-20",
    isText && "px-8 pt-2 pb-8",
    variation === "images" && "overflow-hidden",
    bgColor
  );

  return (
    <section className={cardClasses}>
      {variation === "default" ? (
        <Default data={slice} />
      ) : variation === "image" ? (
        <Image data={slice} />
      ) : variation === "wine" ? (
        <Wine data={slice} bgColor={bgColor} />
      ) : null}
    </section>
  );
};

export default Card;
