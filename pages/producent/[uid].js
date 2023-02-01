import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import * as prismic from "@prismicio/client";

import { createClient } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";

import Header from "../../components/Header/base/";
import Card from "../../components/Card/";
import { Heading } from "../../components/Heading";
import clsx from "clsx";

import Button from "../../components/Button";
import Backdrop from "../../components/Backdrop";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { orderWines } from "../../lib/utils";
import { WineColor } from "../../components/Card/helpers";

import Meta from "../../components/Meta";

const Anchor = ({ anchor, wines }) => {
  const { grape_composition, producer, title } = anchor;

  const grapes = grape_composition.map(({ grape }) => grape);

  const related = grapes
    .map((g) => ({
      title: g.data.title,
      match: wines.filter((w) =>
        w.data.grape_composition.some((b) => b.grape.uid === g.uid)
      ),
    }))
    .filter((a) => a.match.length);

  return (
    <li className="p-8 text-center">
      <div className="text-lg">{title}</div>
      <ul className="mt-4 flex justify-center gap-4">
        {related.map((item, i) => (
          <li key={i}>
            <span className="font-mono uppercase">{item.title}</span>
            <ul className="flex flex-col gap-1">
              {item.match.map((wine, k) => (
                <li key={k} className="relative py-[0.125em]">
                  <WineColor composition={wine?.data?.grape_composition} />
                  <div className="relative mx-4 py-2 px-2">
                    {wine.data.title}
                  </div>
                  {wine?.data?.producer?.data?.title && (
                    <>
                      <div className="relative mx-4 border-t border-dashed px-2 py-2">
                        {prismicH.asText(wine.data.producer.data.title)}
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </li>
  );
};

const Close = ({ setOpen }) => (
  <motion.div
    key={"close"}
    initial={{ y: ".25em", opacity: 0 }}
    animate={{
      y: 0,
      opacity: 1,
      transition: { delay: 0.25, type: "tween", duration: 0.5 },
    }}
    exit={{ y: ".25em", opacity: 0 }}
    transition={{ type: "tween" }}
    className={
      "absolute inset-x-0 bottom-0 flex w-full justify-center pb-8 font-mono uppercase"
    }
  >
    <Button onTap={() => setOpen(false)}>[Stäng]</Button>
  </motion.div>
);

const Vindex = ({ wines, render }) => {
  const [isOpen, setOpen] = useState(false);
  if (!render) return null;

  return (
    <>
      <Header
        className="fixed right-0 inline-block pt-4 text-xl tracking-tight lg:pt-5"
        animate={"lg:translate-y-[-0%]"}
      >
        <Button
          size="mini"
          className="border bg-white/0 px-1 backdrop-blur"
          classNames="underline decoration-1 underline-offset-4"
          onTap={() => setOpen(true)}
        >
          Vindex
        </Button>
      </Header>
      <AnimatePresence>
        {isOpen && (
          <Backdrop bg={"bg-purple/40"}>
            <ul className="relative h-full divide-y divide-solid">
              {wines.producer.map((anchor, i) => (
                <Anchor
                  key={i}
                  anchor={anchor.data ?? anchor.primary?.reference?.data}
                  wines={wines.all}
                />
              ))}
            </ul>
            <Close setOpen={setOpen} />
          </Backdrop>
        )}
      </AnimatePresence>
    </>
  );
};

const Page = ({ page, navigation, marquee, settings, wines }) => {
  const { seo_cards, seo_description, seo_title } = page.data;

  const set = orderWines(
    page.data.slices,
    wines.filter((b) => b.data.producer.uid === page.uid)
  );

  const vindex = {
    producer: set.filter((a) => a?.variation === "wine" || a?.type === "wine"),
    all: wines.filter((a) => a.data.producer.uid != page.uid),
  };

  return (
    <Layout
      navigation={navigation}
      marquee={marquee}
      settings={settings}
      className={"pt-0"}
    >
      <Meta
        title={`${prismicH.asText(settings.data.siteTitle)}: ${
          prismicH.asText(page.data.title) ?? seo_title
        }`}
        description={seo_description}
        og={seo_cards?.find((c) => c.variation === "default")}
        twitter={seo_cards?.find((c) => c.variation === "twitterCard")}
      />
      <Header
        placement={{ col: "center" }}
        className="sticky pt-[3.25em] pb-20 lg:pt-5"
        animate={"translate-y-[-2.2em] lg:translate-y-[-0%]"}
      >
        <Heading
          as="h1"
          size="xl"
          className="underline decoration-1 underline-offset-4 lg:no-underline"
        >
          {prismicH.asText(page.data.title)}
        </Heading>
      </Header>
      <Vindex wines={vindex} render={false} />
      <section
        className={clsx(
          "relative grid max-w-screen-xl items-stretch lg:grid-cols-2",
          "mx-auto px-2 pb-8 sm:px-8 lg:px-12",
          "gap-4 lg:gap-8 xl:gap-x-12"
        )}
      >
        {set.map((card, i) => (
          <Card data={card} key={card.id} />
        ))}
      </section>
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("producer", params.uid, {
    fetchLinks: [
      "wine.title",
      "wine.origin",
      "wine.color",
      "wine.grape_composition",
      "wine.soil",
      "wine.method",
      "wine.hl_ha",
      "wine.alcohol",
      "wine.resellers",
      "grape.title",
      "producer.title",
    ],
  });
  const wines = await client.getAllByType("wine", {
    fetchLinks: ["grape.title", "producer.title"],
  });
  const navigation = await client.getSingle("navigation");
  const marquee = await client.getSingle("marquee");
  const settings = await client.getSingle("settings");

  return {
    props: {
      page,
      navigation,
      marquee,
      settings,
      wines,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("producer");

  return {
    paths: pages.map((page) => {
      return {
        params: { uid: page.uid },
      };
    }),
    fallback: false,
  };
}
