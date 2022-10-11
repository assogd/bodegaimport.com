import React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export const Default = ({ data }) => {
  return (
    <article className="font-mono text-sm">
      <header className="font-serif z-2 sticky top-0 left-0 bg-white py-4 pb-2 text-base">
        <PrismicRichText field={data.primary.title} />
      </header>
      <PrismicRichText field={data.primary.body} />
    </article>
  );
};

export const Image = ({ data }) => {
  const { file, caption } = data.primary;

  return (
    <figure className="sticky top-14 overflow-hidden rounded">
      <PrismicNextImage field={file} layout="responsive" />
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 py-4 px-6 text-sm text-gray-100">
          <PrismicRichText field={caption} />
        </figcaption>
      )}
    </figure>
  );
};

export const Wine = ({ data }) => {
  const {
    alcohol,
    grape_composition,
    hl_ha,
    method,
    origin,
    resellers,
    soil,
    title,
  } = data.primary.reference.data;

  console.log(data.primary);

  return (
    <div>
      <header className="font-serif z-2 sticky top-0 left-0 bg-white py-4 pb-2 text-base">
        <h4>{title}</h4>
      </header>
      <div>
        <h5>Jord</h5>
        {soil}
      </div>
    </div>
  );
};
