import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices/";

import { Layout } from "../components/Layout";
import { Header, Observer } from "../components/Header/chunky";

import { useState } from "react";

const Index = ({ page, navigation, marquee, settings, wines }) => {
  const [mainLogotypeInView, setMainLogotypeInView] = useState(false);

  return (
    <Layout
      navigation={navigation}
      marquee={marquee}
      settings={settings}
      className="min-h-[400vh] p-4 sm:p-8"
      logotype={{ alwaysCentered: true, inView: mainLogotypeInView }}
    >
      <Head>
        <title>Bodega Import</title>
      </Head>
      <div className="grid gap-4 sm:grid-cols-2">
        <Observer
          mainLogotypeInView={mainLogotypeInView}
          setMainLogotypeInView={setMainLogotypeInView}
        >
          <Header />
        </Observer>
        <SliceZone
          slices={page.data.slices}
          components={components}
          context={{ wines: wines }}
        />
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
  const wines = await client.getAllByType("wine", {
    lang: locale,
    fetchLinks: ["grape.title"],
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
      wines,
    },
  };
}
