import Head from "next/head";
import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import clsx from "clsx";
import { camelCase } from "../lib/utils/text";
import { useRef } from "react";

const Box = ({ grape }) => {
  const ref = useRef();

  return (
    <div
      className={clsx(
        `bg-wine-${camelCase(grape.data.title)}`,
        "rounded-md p-8",
        "text-center font-mono uppercase",
        "h-48",
        "flex items-center justify-center"
      )}
      ref={ref}
    >
      {grape.data.title}
    </div>
  );
};

const Index = ({ grapes, navigation, marquee, settings }) => {
  console.log(grapes);
  return (
    <Layout
      navigation={navigation}
      marquee={marquee}
      logotype={{ alwaysCentered: true, inView: true }}
    >
      <Head>
        <title>Bodega Import: Färgschema</title>
      </Head>
      <div className="grid gap-4 p-4 pt-8 md:grid-cols-2 md:p-8 md:pt-8 xl:grid-cols-3">
        {grapes.map((grape, i) => (
          <Box key={i} grape={grape} />
        ))}
      </div>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const grapes = await client.getAllByType("grape", {});

  const navigation = await client.getSingle("navigation", { lang: locale });
  const marquee = await client.getSingle("marquee", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });

  return {
    props: {
      grapes,
      navigation,
      marquee,
      settings,
    },
  };
}
