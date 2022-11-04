import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices/";

import { Layout } from "../components/Layout";
import Header from "../components/Header/chunky";

const Index = ({ page, navigation, marquee, settings }) => {
  return (
    <Layout
      navigation={navigation}
      marquee={marquee}
      settings={settings}
      className="min-h-[200vh] py-0 px-8"
      logotypeInView={false}
    >
      <Head>
        <title>{prismicH.asText(page.data.title)}</title>
      </Head>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative">
          <Header />
          <div className="observer" />
        </div>
        <SliceZone slices={page.data.slices} components={components} />
      </div>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", "home", { lang: locale });
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
