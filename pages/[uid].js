import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices";
import { Layout } from "../components/Layout";

import { Heading } from "../components/Heading";
import Card from "../components/Card/";
import Carousel from "../components/Carousel";

import useScrollDirection from "../lib/hooks/useScrollDirection";
import { motion } from "framer-motion";
import clsx from "clsx";

const Page = ({ page, list, navigation, marquee, settings }) => {
  return (
    <Layout navigation={navigation} marquee={marquee} settings={settings}>
      <Head>
        <title>
          {prismicH.asText(settings.data.siteTitle)}:{" "}
          {prismicH.asText(page.data.title)}
        </title>
      </Head>
      <Header>{prismicH.asText(page.data.title)}</Header>
      <SliceZone slices={page.data.slices} components={components} />
      {list
        .filter((a) => a.producers.length > 0)
        .map((item) => (
          <section key={item.slug} className="region h-[200em] w-full">
            <header className="sticky top-0 right-0 w-full p-8 text-right">
              <Heading as="h2" size="xl">
                {item.origin.region}, {item.origin.country}
              </Heading>
            </header>
            {item.producers.map((producer) => (
              <section key={producer.id} className="producer h-[200em]">
                <header className="sticky inset-x-0 top-12 p-8 text-center">
                  <Heading as="h2" size="xl">
                    {producer.data.title}
                  </Heading>
                </header>
                <Carousel>
                  {producer.data.slices.map((card) => (
                    <Card key={card.id} data={card} size="sm" animate={false} />
                  ))}
                </Carousel>
              </section>
            ))}
          </section>
        ))}
    </Layout>
  );
};

export default Page;

const Header = ({ children }) => {
  const [isScrollingUp] = useScrollDirection();

  const variants = {
    outsideView: { y: "-2.25em" },
    inView: { y: 0 },
  };

  const headerClasses = clsx("sticky inset-x-0 text-center md:top-0 top-14");

  return (
    <motion.header
      className={headerClasses}
      animate={isScrollingUp ? "inView" : "outsideView"}
      variants={variants}
      transition={{ type: "tween", duration: 0.5, delay: 0.25 }}
    >
      <Heading size="xl">{children}</Heading>
    </motion.header>
  );
};

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", params.uid, {
    lang: locale,
    fetchLinks: ["producer.title", "producer.region", "card.caption"],
  });
  const origins = await client.getAllByType("origin");
  const producers = await client.getAllByType("producer", {
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
    ],
  });
  const navigation = await client.getSingle("navigation", { lang: locale });
  const marquee = await client.getSingle("marquee", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });

  const list = origins.map((origin) => ({
    origin: origin.data,
    slug: origin.slugs[0],
    producers: producers.filter(
      (producer) => producer.data.region_ref.id === origin.id
    ),
  }));

  const sortList = list.sort((a, b) => a.origin.region > b.origin.region);

  return {
    props: {
      page,
      list,
      navigation,
      marquee,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("page", { lang: "*" });

  return {
    paths: pages.map((page) => {
      return {
        params: { uid: page.uid },
        locale: page.lang,
      };
    }),
    fallback: false,
  };
}
