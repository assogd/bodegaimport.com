import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import * as prismic from "@prismicio/client";

import { createClient } from "../prismicio";
import { components } from "../slices";
import { Layout } from "../components/Layout";

import { Heading } from "../components/Heading";
import ListOfProducers from "../components/ListOfProducers";
import Articles from "../components/Articles";
import Header from "../components/Header/base/";

import clsx from "clsx";
import slugify from "slugify";

import { useRouter } from "next/router";

import OverlayCard from "../components/Overlay/card";
import OverlayArticle from "../components/Overlay/article";
import { AnimatePresence } from "framer-motion";

import Section from "../components/Section";

const Page = ({
  page,
  list,
  navigation,
  marquee,
  settings,
  articles,
  wines,
}) => {
  const router = useRouter();

  const overlayCard =
    list &&
    list.filter(
      (r) =>
        slugify(r.origin.region, { lower: true }) === router.query?.region &&
        r.producers.find((p) => p.uid === router.query?.producer)
    );

  const params = {
    region: {
      slug: router.query.region,
      title: list && list.find((r) => r.slug === router.query.region)?.origin,
    },
    producer: {
      slug: router.query.producer,
      title: prismicH.asText(overlayCard[0]?.producers[0]?.data?.title),
    },
    card: { slug: router.query.cardId },
  };

  const isOverlayCard = overlayCard && overlayCard.length && params?.card?.slug;
  const isOverlayArticle = router.query.aid && articles;
  const isAboutPage = router.query.uid === "om-oss";

  return (
    <Layout
      navigation={navigation}
      marquee={marquee}
      settings={settings}
      disableScroll={isOverlayCard || isOverlayArticle}
      logotype={{ alwaysCentered: false }}
      className={clsx("sticky")}
      bg={isAboutPage && "bg-paleYellow"}
    >
      <Head>
        <title>
          {prismicH.asText(settings.data.siteTitle)}:{" "}
          {prismicH.asText(page.data.title)}
        </title>
      </Head>
      <Section className="relative grid gap-4 px-4 sm:gap-8 sm:px-8">
        <Header
          placement={{ col: "center", row: "first" }}
          className="relative lg:pt-6"
        >
          <Heading size="xl">{prismicH.asText(page.data.title)}</Heading>
        </Header>
        <SliceZone slices={page.data.slices} components={components} />
      </Section>
      {list && list.length && <ListOfProducers list={list} wines={wines} />}
      {articles && articles.length && <Articles articles={articles} />}
      <AnimatePresence>
        {isOverlayCard && (
          <OverlayCard
            data={overlayCard[0].producers[0].data.slices}
            size="lg"
            params={params}
          />
        )}
        {isOverlayArticle && (
          <OverlayArticle articles={articles} params={router.query} />
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });
  const fetchProducers = params.uid === "sortiment";
  const fetchNews = params.uid === "nyheter";

  const links = {
    page: ["producer.title", "producer.region", "card.caption"],
    producers: [
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
    wines: ["grape.title"],
  };

  const navigation = await client.getSingle("navigation", { lang: locale });
  const marquee = await client.getSingle("marquee", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });

  const articles =
    fetchNews &&
    (await client.getAllByType("article", {
      orderings: {
        field: "my.article.date_published",
        direction: "desc",
      },
      lang: locale,
      predicates: [prismic.predicate.at("my.article.type", "News")],
    }));

  const page = await client.getByUID("page", params.uid, {
    lang: locale,
    fetchLinks: links.page,
  });

  const origins = fetchProducers && (await client.getAllByType("origin"));

  const producers =
    fetchProducers &&
    (await client.getAllByType("producer", {
      fetchLinks: links.producers,
    }));

  const wines =
    fetchProducers &&
    (await client.getAllByType("wine", { fetchLinks: links.wines }));

  const list =
    fetchProducers &&
    origins
      .map((origin) => ({
        origin: origin.data,
        slug: origin.slugs[0],
        producers: producers.filter(
          (producer) => producer.data.region_ref.id === origin.id
        ),
      }))
      .filter((a) => a.producers.length > 0)
      .sort((a, b) => a.origin.region.localeCompare(b.origin.region));

  return {
    props: {
      page,
      list,
      navigation,
      marquee,
      settings,
      articles,
      wines,
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
