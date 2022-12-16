import { PrismicRichText } from "@prismicio/react";
import extractDomain from "extract-domain";
import Button from "../../Button";
import { motion } from "framer-motion";
import clsx from "clsx";
import { camelCase } from "../../../lib/utils/text";
import { WineColor } from "../helpers";
import { compSum } from "../../../lib/utils";
import { Container, Header, Open } from "../elements";
import * as prismicH from "@prismicio/helpers";
import Link from "next/link";

const Li = ({ children }) => (
  <li className="border-b border-dashed py-2 first:pt-0 last:border-0">
    {children}
  </li>
);

const Heading = ({ children }) => (
  <h5 className="text-monoBase leading-relaxed">{children}</h5>
);

const Body = ({ children }) => (
  <div className={clsx("font-mono text-monoBase")}>{children}</div>
);

const Producer = ({ producer }) => (
  <Li>
    <Heading>Producent</Heading>
    <Body>
      <Link href={producer.url}>
        <a className="sober underline decoration-black decoration-solid decoration-from-font underline-offset-4">
          {prismicH.asText(producer?.data?.title)}
        </a>
      </Link>
    </Body>
  </Li>
);

const Grapes = ({ grapes }) => {
  const body = grapes
    .map(
      (grape) =>
        `${Math.round((grape.density / compSum(grapes)) * 100)}% ${
          grape.grape.data.title
        }`
    )
    .join(", ");

  return (
    <Li>
      <Heading>{grapes.length === 1 ? "Druva" : "Druvor"}</Heading>
      <Body>{body}</Body>
    </Li>
  );
};

const Method = ({ body, render }) =>
  render && (
    <Li>
      <Heading>Metod</Heading>
      <Body>
        <PrismicRichText field={body} />
      </Body>
    </Li>
  );

const ListItem = ({ title, body, render = true }) =>
  body &&
  render && (
    <Li>
      <Heading>{title}</Heading>
      <Body>{body}</Body>
    </Li>
  );

const Wine = ({ data, bgColor, size, params, href, listProducer }) => {
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
    producer,
  } = data.data;

  return (
    <Container size={size}>
      <WineColor composition={grape_composition} />
      <Header>
        <h4 className="truncate">{title}</h4>
        {(href || params) && (
          <Open
            href={href ?? `/producent/${params.producer.slug}#${data.uid}`}
          />
        )}
      </Header>
      <ul className="relative">
        {listProducer && <Producer producer={producer} />}
        <ListItem title="Ursprung" body={origin} />
        <ListItem title="Jord" body={soil} />
        <Grapes grapes={grape_composition} />
        <Method body={method} render={size != "sm"} />
        <ListItem title="HL/HA" body={hl_ha} render={size != "sm"} />
        <ListItem title="Alkohol" body={alcohol} />
        {size != "sm" && <Resellers data={resellers} />}
      </ul>
    </Container>
  );
};

const Resellers = ({ data }) => {
  const incomplete =
    data.findIndex((a) => a.art_no && a.volume && a.price) === -1;
  if (!data.length || incomplete) return null;

  return (
    <li className="border-b border-dashed py-2 first:pt-0 last:border-0">
      <h5 className="text-monoBase leading-relaxed">Återförsäljare</h5>
      <div className={clsx("font-mono text-monoBase")}>
        {data.map(
          (item, i) =>
            item?.volume &&
            item?.art_no &&
            item?.price && (
              <motion.div
                key={i}
                className="mt-2 grid gap-1 rounded-md bg-white/60 p-4"
              >
                <div className="flex justify-between">
                  <div>{item?.reseller ?? "Bodega Import"}</div>
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
            )
        )}
      </div>
    </li>
  );
};

export default Wine;
