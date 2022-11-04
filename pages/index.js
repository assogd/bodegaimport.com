import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices/";

import { Layout } from "../components/Layout";
import { Header, Observer } from "../components/Header/chunky";

import { useState } from "react";

const Index = ({ page, navigation, marquee, settings }) => {
  const [mainLogotypeInView, setMainLogotypeInView] = useState(false);
  return (
    <Layout
      navigation={navigation}
      marquee={marquee}
      settings={settings}
      className="min-h-[400vh] py-0 px-4 md:px-8"
      logotypeInView={mainLogotypeInView}
    >
      <Head>
        <title>{prismicH.asText(page.data.title)}</title>
      </Head>
      <div className="grid gap-4 md:grid-cols-2">
        <Observer
          mainLogotypeInView={mainLogotypeInView}
          setMainLogotypeInView={setMainLogotypeInView}
        >
          <Header />
        </Observer>
        <SliceZone slices={page.data.slices} components={components} />
      </div>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", "home", {
    lang: locale,
    fetchLinks: ["producer.title"],
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
