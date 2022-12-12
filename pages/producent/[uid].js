import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";

import Header from "../../components/Header/sticky/";
import { Heading } from "../../components/Heading";
import clsx from "clsx";

const Page = ({ page, navigation, marquee, settings }) => {
  return (
    <Layout
      navigation={navigation}
      marquee={marquee}
      settings={settings}
      className={"pt-0"}
    >
      <Head>
        <title>
          {prismicH.asText(settings.data.siteTitle)}:{" "}
          {prismicH.asText(page.data.title)}
        </title>
      </Head>
      <Header placement={{ col: "center", row: "second" }} className="sticky">
        <Heading as="h1" size="xl">
          {prismicH.asText(page.data.title)}
        </Heading>
      </Header>
      <section className="cards relative mx-auto mt-4 grid max-w-screen-xl items-stretch gap-4 px-4 py-8 sm:px-8 lg:grid-cols-2 lg:px-12">
        <SliceZone slices={page.data.slices} components={components} />
      </section>
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("producer", params.uid, {
    lang: locale,
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

  return {
    props: {
      page,
      navigation,
      marquee,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("producer", { lang: "*" });

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
