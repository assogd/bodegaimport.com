import Meta from "../components/Meta";
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

import { AnimatePresence } from "framer-motion";

import Section from "../components/Section";

import Toggle from "../components/Toggle";
import useAssoCookie from "../lib/hooks/useAssoCookie";
import { useState, useEffect } from "react";

const Page = ({
  page,
  list,
  navigation,
  marquee,
  settings,
  articles,
  wines,
}) => {
  const { seo_cards, seo_description, seo_title } = page.data;
  const router = useRouter();
  const renderToggle = router.query.uid !== "sortiment";

  //if (router.asPath === "/hem") return router.push("/");

  const overlayCard =
    list &&
    list.filter(
      (r) =>
        slugify(r.origin.region, { lower: true }) === router.query?.region &&
        r.producers.find((p) => p.uid === router.query?.producer)
    );

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
      className={clsx("")}
      bg={isAboutPage && "bg-paleYellow"}
    >
      {!isOverlayArticle && (
        <Meta
          title={`${prismicH.asText(settings.data.siteTitle)}: ${
            prismicH.asText(page.data.title) ?? seo_title
          }`}
          description={seo_description}
          og={seo_cards?.find((c) => c.variation === "default")}
          twitter={seo_cards?.find((c) => c.variation === "twitterCard")}
        />
      )}
      <Section className="relative grid gap-6 px-4 pb-8 sm:gap-8 sm:px-4">
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
    </Layout>
  );
};

export default Page;

export async function getServerSideProps({ params, previewData }) {
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

  const navigation = await client.getSingle("navigation");
  const marquee = await client.getSingle("marquee");
  const settings = await client.getSingle("settings");

  const articles =
    fetchNews &&
    (await client.getAllByType("article", {
      orderings: {
        field: "my.article.date_published",
        direction: "desc",
      },
      predicates: [prismic.predicate.at("my.article.type", "News")],
    }));

  const page = await client.getByUID("page", params.uid, {
    fetchLinks: links.page,
  });

  return {
    props: {
      page,
      navigation,
      marquee,
      settings,
      articles,
    },
  };
}

/*export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("page");
  const pagesWithoutHome = pages.filter((a) => a.uid !== "hem");

  return {
    paths: pagesWithoutHome.map((page) => {
      return {
        params: { uid: page.uid },
      };
    }),
    fallback: false,
  };
}*/
