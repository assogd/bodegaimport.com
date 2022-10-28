import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices";
import { Layout } from "../components/Layout";

import { Heading } from "../components/Heading";
import Carousel from "../components/Carousel";
import Overlay from "../components/Overlay/card";

import useScrollDirection from "../lib/hooks/useScrollDirection";
import { motion } from "framer-motion";

import clsx from "clsx";
import slugify from "slugify";

import { useRouter } from "next/router";

const Page = ({ page, list, navigation, marquee, settings }) => {
  const router = useRouter();

  const overlay = list.filter(
    (r) =>
      slugify(r.origin.region, { lower: true }) === router.query?.region &&
      r.producers.find((p) => p.uid === router.query?.producer)
  );

  const params = {
    region: {
      slug: router.query.region,
      title: list.find((r) => r.slug === router.query.region)?.origin,
    },
    producer: {
      slug: router.query.producer,
      title: overlay[0]?.producers[0]?.data?.title,
    },
    card: { slug: router.query.cardId },
  };

  const isOverlay = overlay && overlay.length && params.card.slug;

  return (
    <Layout
      navigation={navigation}
      marquee={marquee}
      settings={settings}
      disableScroll={isOverlay}
    >
      <Head>
        <title>
          {prismicH.asText(settings.data.siteTitle)}:{" "}
          {prismicH.asText(page.data.title)}
        </title>
      </Head>
      <section className="introduction relative">
        <Header className="sticky inset-x-0 top-14 text-center md:fixed md:top-0">
          <Heading size="xl">{prismicH.asText(page.data.title)}</Heading>
        </Header>
        <SliceZone slices={page.data.slices} components={components} />
      </section>
      {list
        .filter((a) => a.producers.length > 0)
        .map((item) => (
          <section key={item.slug} className="region h-[200em] w-full">
            <Header className="sticky top-14 right-0 w-full px-4 text-center md:top-0 md:p-8 md:text-right">
              <Heading as="h2" size="xl">
                {item.origin.region}, {item.origin.country}
              </Heading>
            </Header>
            {item.producers.map((producer) => (
              <section key={producer.id} className="producer h-[200em]">
                <Header className="sticky inset-x-0 top-[3.75em] p-8 text-center md:top-12">
                  <Heading as="h2" size="xl">
                    {producer.data.title}
                  </Heading>
                </Header>
                <Carousel
                  data={producer.data.slices}
                  params={{
                    region: {
                      title: `${item.origin.region}, ${item.origin.country}`,
                      slug: item.slug,
                    },
                    producer: {
                      title: producer.data.title,
                      slug: producer.uid,
                    },
                  }}
                />
              </section>
            ))}
          </section>
        ))}
      {isOverlay && (
        <Overlay
          data={overlay[0].producers[0].data.slices}
          size="lg"
          params={params}
        />
      )}
    </Layout>
  );
};

export default Page;

const Header = ({ children, className }) => {
  const [isScrollingUp] = useScrollDirection();

  const variants = {
    outsideView: { y: "-2.25em" },
    inView: { y: 0 },
  };

  return (
    <motion.header
      className={className}
      animate={isScrollingUp ? "inView" : "outsideView"}
      variants={variants}
      transition={{ type: "tween", duration: 0.5, delay: 0.25 }}
    >
      {children}
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
