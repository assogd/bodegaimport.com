import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";

import { Heading } from "../../components/Heading";

const Page = ({ page, navigation, settings }) => {
  return (
    <Layout navigation={navigation} settings={settings}>
      <Head>
        <title>
          {prismicH.asText(settings.data.siteTitle)}: {page.data.title}
        </title>
      </Head>
      <header className="sticky inset-x-0 top-0 z-0 pt-8 text-center">
        <Heading size="xl">{page.data.title}</Heading>
      </header>
      <section className="cards relative grid gap-4 p-8 md:grid-cols-2 md:px-12">
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
  const settings = await client.getSingle("settings", { lang: locale });

  return {
    props: {
      page,
      navigation,
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
