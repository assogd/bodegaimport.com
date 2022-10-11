import React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Image from "./image";

const Card = ({ slice }) => {
  console.log(slice);
  return (
    <section className="card overflow-hidden rounded-lg">
      {slice.variation === "image" ? <Image data={slice} /> : null}
    </section>
  );
};

export default Card;
