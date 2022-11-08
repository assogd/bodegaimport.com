import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import * as prismic from "@prismicio/client";

import { createClient } from "../prismicio";
import { components } from "../slices";
import { Layout } from "../components/Layout";

import { Heading } from "../components/Heading";
import Overlay from "../components/Overlay/card";
import ListOfProducers from "../components/ListOfProducers";
import Header from "../components/Header/sticky/";

import useScrollDirection from "../lib/hooks/useScrollDirection";

import clsx from "clsx";
import slugify from "slugify";

import { useRouter } from "next/router";

const Page = ({ page, list, navigation, marquee, settings, articles }) => {
  const router = useRouter();
  const [isScrollingUp] = useScrollDirection();

  console.log(articles);

  const overlay =
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
      title: overlay[0]?.producers[0]?.data?.title,
    },
    card: { slug: router.query.cardId },
  };

  const isOverlay = overlay && overlay.length && params?.card?.slug;

  return (
    <Layout
      navigation={navigation}
      marquee={marquee}
      settings={settings}
      disableScroll={isOverlay}
      logotype={{ inView: isScrollingUp, alwaysCentered: false }}
    >
      <Head>
        <title>
          {prismicH.asText(settings.data.siteTitle)}:{" "}
          {prismicH.asText(page.data.title)}
        </title>
      </Head>
      <section className="introduction relative">
        <Header className="sticky inset-x-0 top-14 text-center md:fixed md:top-6">
          <Heading size="xl">{prismicH.asText(page.data.title)}</Heading>
        </Header>
        <SliceZone slices={page.data.slices} components={components} />
      </section>
      {list && list.length && <ListOfProducers list={list} />}
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
  };

  const navigation = await client.getSingle("navigation", { lang: locale });
  const marquee = await client.getSingle("marquee", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });

  const articles = await client.getAllByType("article", {
    orderings: {
      field: "document.date_published",
      direction: "desc",
    },
    lang: locale,
    predicates: [prismic.predicate.at("my.article.type", "News")],
  });

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

  const list =
    fetchProducers &&
    origins.map((origin) => ({
      origin: origin.data,
      slug: origin.slugs[0],
      producers: producers.filter(
        (producer) => producer.data.region_ref.id === origin.id
      ),
    }));

  const sortList =
    list && list.sort((a, b) => a.origin.region > b.origin.region);

  return {
    props: {
      page,
      list,
      navigation,
      marquee,
      settings,
      articles,
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
