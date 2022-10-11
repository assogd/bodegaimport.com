import React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

const Image = ({ data }) => {
  console.log(data);
  return (
    <figure>
      <PrismicNextImage field={data.primary.file} layout="responsive" />
    </figure>
  );
};

export default Image;
