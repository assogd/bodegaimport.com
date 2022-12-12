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

  return (
    <div className="px-6 py-2">
      <WineColor composition={grape_composition} />
      <header
        className={`z-2 sticky top-0 left-0 w-full py-4 pb-2 font-serif text-base`}
      >
        <h4 className=" truncate">{title}</h4>
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
        {size != "sm" && <Resellers data={resellers} />}
      </ul>
    </div>
  );
};

const ListItem = ({ title, body, type, compSum }) => {
  if (!body) return null;

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
        {grapes ?? richText ?? body}
      </div>
    </li>
  );
};

const Resellers = ({ data }) => {
  if (!data.length) return null;

  return (
    <li className="border-b border-dashed py-2 first:pt-0 last:border-0">
      <h5 className="text-monoBase leading-relaxed">Återförsäljare</h5>
      <div className={clsx("font-mono text-monoBase")}>
        {data.map((item, i) => (
          <motion.div
            key={i}
            className="mt-2 grid gap-1 rounded-md bg-white/60 p-4"
          >
            <div className="flex justify-between">
              <div>{item?.reseller}</div>
              <div>{item?.volume && `${item.volume} ml`}</div>
            </div>
            <div className="flex justify-between">
              <div>{item?.art_no && `Artikelnr ${item.art_no}`}</div>
              <div>{item?.price && `${item.price} SEK`}</div>
            </div>
            {item.link.url && (
              <Button
                href={item.link.url}
                className="mt-2 w-full bg-red/50 font-serif"
              >
                Beställ från {extractDomain(item.link.url)}
              </Button>
            )}
          </motion.div>
        ))}
      </div>
    </li>
  );
};

export default Wine;
