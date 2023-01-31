import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import * as prismic from "@prismicio/client";

import { createClient } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";

import Header from "../../components/Header/base/";
import { Heading } from "../../components/Heading";
import clsx from "clsx";

import Meta from "../../components/Meta";

import { useRouter } from "next/router";

import { getYear, getMonth, getDate } from "../../lib/utils/date";

import { PrismicRichText } from "@prismicio/react";
import { motion } from "framer-motion";

import Image from "next/future/image";
import Related from "../../components/Articles/related2";

const Article = ({ article, articles, navigation, marquee, settings }) => {
  const {
    date_published,
    hero_image,
    seo_cards,
    seo_description,
    seo_title,
    slices,
    title,
    type,
  } = article.data;

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const related = articles
    .filter(
      (a) =>
        new Date(a.data.date_published) < new Date(article.data.date_published)
    )
    .concat(
      articles.filter(
        (a) =>
          new Date(a.data.date_published) >
          new Date(article.data.date_published)
      )
    )
    .slice(0, 4);

  console.log(article);

  return (
    <Layout
      navigation={navigation}
      marquee={marquee}
      settings={settings}
      className={"pt-0"}
    >
      <Meta
        title={`${prismicH.asText(settings.data.siteTitle)}: ${
          prismicH.asText(article.data.title) ?? seo_title
        }`}
        description={seo_description}
        og={seo_cards?.find((c) => c.variation === "default")}
        twitter={seo_cards?.find((c) => c.variation === "twitterCard")}
      />
      <header
        placement={{ col: "center" }}
        className="sticky text-center lg:pt-5"
      >
        <Heading as="h2" size="xl">
          Nyhet
        </Heading>
      </header>
      <article className="mx-2 min-h-[65vh] pb-24">
        <div className="body grid gap-4">
          <header className="pt-12 pb-4 text-center">
            <h1 className="mb-2 w-full text-xl md:text-xxl">
              <PrismicRichText field={title} />
            </h1>
            <div role="doc-subtitle" className="font-mono">
              {new Date(date_published).toLocaleDateString("sv", options)}
            </div>
          </header>
          <motion.figure className="mx-auto max-w-2xl">
            <Image
              src={hero_image.url}
              width={hero_image.dimensions.width}
              height={hero_image.dimensions.height}
              alt={hero_image.alt ?? "Ingen beskrivning tillgänglig"}
            />
          </motion.figure>
          <SliceZone slices={slices} components={components} />
        </div>
      </article>
      <Related articles={related} />
    </Layout>
  );
};

export default Article;

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });

  const article = await client.getByUID("article", params.uid, {
    lang: locale,
    fetchLinks: [],
  });
  const articles = await client.getAllByType("article", {
    orderings: {
      field: "my.article.date_published",
      direction: "desc",
    },
    lang: locale,
    predicates: [prismic.predicate.at("my.article.type", "News")],
  });
  const navigation = await client.getSingle("navigation", { lang: locale });
  const marquee = await client.getSingle("marquee", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });

  return {
    props: {
      article,
      articles,
      navigation,
      marquee,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("article", { lang: "*" });

  return {
    paths: pages.map((page) => {
      return {
        params: {
          uid: page.uid,
          year: getYear(pages[0].data.date_published),
          month: getMonth(pages[0].data.date_published),
          date: getDate(pages[0].data.date_published),
        },
        locale: page.lang,
      };
    }),
    fallback: false,
  };
}
