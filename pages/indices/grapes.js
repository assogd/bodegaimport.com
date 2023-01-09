import Head from "next/head";
import { createClient } from "../../prismicio";
import { Layout } from "../../components/Layout";
import clsx from "clsx";
import { camelCase } from "../../lib/utils/text";
import { useRef } from "react";

const Box = ({ grape }) => {
  const ref = useRef();

  return (
    <div
      className={clsx(
        `bg-wine-${camelCase(grape.data.title)}`,
        "rounded-md p-8",
        "text-center font-mono",
        "h-48",
        "flex items-center justify-center"
      )}
      ref={ref}
    >
      <div>
        <h1 className="uppercase underline">{grape.data.title}</h1>
        <ul>
          <li>
            UID: <span className="font-serif">{grape.uid}</span>
          </li>
          <li>
            CID:{" "}
            <span className="font-serif">
              wine-{camelCase(grape.data.title)}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const findDuplicates = (arr) => {
  let sorted_arr = arr.slice().sort();
  let results = [];
  for (let i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1].toLowerCase() == sorted_arr[i].toLowerCase()) {
      results.push(sorted_arr[i]);
    }
  }
  return results;
};

const Index = ({ grapes, navigation, marquee, settings }) => {
  const duplicates = grapes
    .map((g) => g.data.title.toLowerCase())
    .filter((e, i, a) => a.indexOf(e) != i);

  return (
    <Layout
      navigation={navigation}
      marquee={marquee}
      logotype={{ alwaysCentered: true, inView: true }}
    >
      <Head>
        <title>Bodega Import: Färgschema</title>
      </Head>
      <div className="grid gap-8 p-4 pt-8 md:p-8 md:pt-8 lg:pt-16">
        {duplicates && (
          <div className="border p-4">
            WARNING
            <br />
            Found duplicates:{" "}
            <span className="font-serif capitalize">
              {duplicates.join(", ")}
            </span>
          </div>
        )}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {grapes.map((grape, i) => (
            <Box key={i} grape={grape} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const grapes = await client.getAllByType("grape", {
    orderings: {
      field: "my.grape.title",
      direction: "asc",
    },
  });

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
