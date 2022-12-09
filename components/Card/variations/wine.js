import { PrismicRichText } from "@prismicio/react";
import extractDomain from "extract-domain";
import Button from "../../Button";
import { motion } from "framer-motion";
import clsx from "clsx";
import { camelCase } from "../../../lib/utils/text";
import { WineColor } from "../helpers";
import { compSum } from "../../../lib/utils";

const Wine = ({ data, bgColor, size }) => {
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
    id,
  } = data.data;

  console.log(size);

  return (
    <div className="px-6 py-2">
      <WineColor composition={grape_composition} />
      <header
        className={`z-2 sticky top-0 left-0 font-serif bg-${bgColor} py-4 pb-2 text-base`}
      >
        <h4>{title}</h4>
      </header>
      <ul className="relative">
        <ListItem title="Ursprung" body={origin} />
        <ListItem title="Jord" body={soil} />
        <ListItem
          type="grapes"
          title="Druvor"
          body={grape_composition}
          compSum={compSum}
        />
        {size != "sm" && (
          <ListItem type="richText" title="Metod" body={method} />
        )}
        {size != "sm" && <ListItem title="HL/HA" body={hl_ha} />}
        <ListItem title="Alkohol" body={alcohol} />
        {size != "sm" && (
          <ListItem type="resellers" title="Återförsäljare" body={resellers} />
        )}
      </ul>
    </div>
  );
};

const ListItem = ({ title, body, type, compSum }) => {
  if (!body) return null;

  const resellers =
    type === "resellers"
      ? body.map((plate, i) => <Plate key={i} data={plate} />)
      : null;

  const grapes =
    type === "grapes"
      ? body
          .map(
            (grape) =>
              `${Math.round((grape.density / compSum(body)) * 100)}% ${
                grape.grape.data.title
              }`
          )
          .join(", ")
      : null;

  const richText =
    type === "richText" ? <PrismicRichText field={body} /> : null;

  return (
    <li className="border-b border-dashed py-2 first:pt-0 last:border-0">
      <h5 className="text-monoBase leading-relaxed">{title}</h5>
      <div className={clsx("font-mono text-monoBase")}>
        {resellers ?? grapes ?? richText ?? body}
      </div>
    </li>
  );
};

const Plate = ({ data }) => {
  const { reseller, art_no, link, volume, price } = data;

  return (
    <motion.div className="mt-2 grid gap-1 rounded-md bg-white/60 p-4">
      <div className="flex justify-between">
        <div>{reseller}</div>
        <div>{volume} ml</div>
      </div>
      <div className="flex justify-between">
        <div>Artikelnr {art_no}</div>
        <div>{price} SEK</div>
      </div>
      <Button href={link.url} className="mt-2 w-full bg-red/50 font-serif">
        Beställ från {extractDomain(link.url)}
      </Button>
    </motion.div>
  );
};

export default Wine;
