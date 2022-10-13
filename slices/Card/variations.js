import React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import extractDomain from "extract-domain";
import Button from "../../components/Button";
import { motion } from "framer-motion";

export const Default = ({ data }) => {
  return (
    <article className="font-mono text-monoBase h-full">
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

export const Wine = ({ data, bgColor }) => {
  const {
    alcohol,
    color,
    grape_composition,
    hl_ha,
    method,
    origin,
    resellers,
    soil,
    title,
  } = data.primary.reference.data;

  return (
    <div>
      <header
        className={`font-serif z-2 sticky top-0 left-0 ${bgColor} py-4 pb-2 text-base`}
      >
        <h4>{title}</h4>
      </header>
      <ul>
        <ListItem title="Ursprung" body={origin} />
        <ListItem title="Jord" body={soil} />
        <ListItem type="grapes" title="Druvor" body={grape_composition} />
        <ListItem type="richText" title="Metod" body={method} />
        <ListItem title="HL/HA" body={hl_ha} />
        <ListItem title="Alkohol" body={alcohol} />
        <ListItem type="resellers" title="Återförsäljare" body={resellers} />
      </ul>
    </div>
  );
};

const ListItem = ({ title, body, type }) => {
  if (!body) return null;

  const resellers =
    type === "resellers"
      ? body.map((plate, i) => <Plate key={i} data={plate} />)
      : null;

  const grapes =
    type === "grapes"
      ? body
          .map((grape) => `${grape.density}% ${grape.grape.data.title}`)
          .join(", ")
      : null;

  const richText =
    type === "richText" ? <PrismicRichText field={body} /> : null;

  return (
    <li className="border-b border-dashed py-2 first:pt-0 last:border-0">
      <h5 className="text-monoBase leading-relaxed">{title}</h5>
      <div className="font-mono text-monoBase">
        {resellers ?? grapes ?? richText ?? body}
      </div>
    </li>
  );
};

const Plate = ({ data }) => {
  const { reseller, art_no, link, volume, price } = data;

  return (
    <motion.div className="mt-2 grid gap-1 rounded bg-white/60 p-4">
      <div className="flex justify-between">
        <div>{reseller}</div>
        <div>{volume} ml</div>
      </div>
      <div className="flex justify-between">
        <div>Artikelnr {art_no}</div>
        <div>{price} SEK</div>
      </div>
      <Button href={link.url} className="bg-red/50 font-serif mt-2 w-full">
        Beställ från {extractDomain(link.url)}
      </Button>
    </motion.div>
  );
};
