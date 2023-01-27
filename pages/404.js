import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices/";

import { Layout } from "../components/Layout";
import { Header, Observer } from "../components/Header/chunky";

import Instagram from "../components/Instagram";
import Meta from "../components/Meta";

const Index = ({ navigation, marquee, settings }) => {
  return (
    <Layout
      navigation={navigation}
      marquee={marquee}
      settings={settings}
      logotype={{ alwaysCentered: true }}
      className=""
    >
      <Meta noindex title={"Bodega Import 404"} />
      <div className="mt-40 h-72 text-center font-mono">404 Error</div>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const navigation = await client.getSingle("navigation", { lang: locale });
  const marquee = await client.getSingle("marquee", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });

  return {
    props: {
      navigation,
      marquee,
      settings,
    },
  };
}
