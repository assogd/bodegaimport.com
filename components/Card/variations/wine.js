import { PrismicRichText } from "@prismicio/react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { camelCase } from "../../../lib/utils/text";
import { WineColor } from "../helpers";
import { compSum } from "../../../lib/utils";
import { Container, Header, Open, Li, Heading, Body } from "../elements";
import * as prismicH from "@prismicio/helpers";
import Link from "next/link";

import Reseller from "./reseller";
import useAssoCookie from "../../../lib/hooks/useAssoCookie";

export const Producer = ({ producer }) => (
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

export const Grapes = ({ grapes }) => {
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

export const Method = ({ body, render }) =>
  render && (
    <Li>
      <Heading>Metod</Heading>
      <Body>
        <PrismicRichText field={body} />
      </Body>
    </Li>
  );

export const ListItem = ({ title, body, render = true }) =>
  body &&
  render && (
    <Li>
      <Heading>{title}</Heading>
      <Body>{body}</Body>
    </Li>
  );

const Resellers = ({ data, render = true }) => {
  if (!render) return null;
  const [preferences] = useAssoCookie();

  const refinedData = data
    .filter(
      (c) =>
        c?.segment === "Both" ||
        c?.segment?.includes(preferences?.consumer) ||
        !c?.segment
    )
    .filter((p) => p.price);

  const incomplete = data.findIndex((a) => a.price) === -1;
  if (!refinedData.length || incomplete || !render) return null;
  console.log(refinedData);

  return (
    <Li>
      <Body>
        {refinedData.map((item, i) => (
          <Reseller key={i} item={item} />
        ))}
      </Body>
    </Li>
  );
};

const translate = (word) =>
  ({
    Both: "both",
    "Private consumer": "consumer",
    Restaurant: "restaurant",
  }[word]);

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
        <Grapes grapes={grape_composition} />
        <ListItem title="Jord" body={soil} />
        <Method body={method} render={size != "sm" && method.length > 0} />
        <ListItem title="HL/HA" body={hl_ha} render={size != "sm"} />
        <ListItem title="Alkohol" body={alcohol} render={size != "sm"} />
        <Resellers data={resellers} render={size != "sm"} />
      </ul>
    </Container>
  );
};

export default Wine;
