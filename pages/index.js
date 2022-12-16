import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices/";

import { Layout } from "../components/Layout";
import { Header, Observer } from "../components/Header/chunky";

import Instagram from "../components/Instagram";

const Index = ({ page, navigation, marquee, settings, wines, articles }) => {
  return (
    <Layout
      navigation={navigation}
      marquee={marquee}
      settings={settings}
      className=""
      logotype={{ alwaysCentered: true }}
    >
      <Head>
        <title>Bodega Import</title>
      </Head>
      <div className="grid items-stretch gap-8 p-0 md:grid-cols-2 md:p-8">
        <Header />
        <SliceZone
          slices={page.data.slices}
          components={components}
          context={{ wines, articles }}
        />
      </div>
      <Instagram />
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", "hem", {
    lang: locale,
    fetchLinks: ["producer.title"],
  });
  const articles = await client.getAllByType("article", {
    orderings: {
      field: "my.article.date_published",
      direction: "desc",
    },
    lang: locale,
  });
  const wines = await client.getAllByType("wine", {
    lang: locale,
    fetchLinks: ["grape.title", "producer.title"],
  });
  const navigation = await client.getSingle("navigation", { lang: locale });
  const marquee = await client.getSingle("marquee", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });

  return {
    props: {
      articles,
      page,
      navigation,
      marquee,
      settings,
      wines,
    },
  };
}
