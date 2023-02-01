import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices/";

import { Layout } from "../components/Layout";
import { Header, Observer } from "../components/Header/chunky";

import Instagram from "../components/Instagram";
import Meta from "../components/Meta";

const Index = ({ page, navigation, marquee, settings, wines, articles }) => {
  const { seo_cards, seo_description, seo_title, slices } = page.data;

  return (
    <Layout
      navigation={navigation}
      marquee={marquee}
      settings={settings}
      className=""
      logotype={{ alwaysCentered: true }}
    >
      <Meta
        title={seo_title}
        description={seo_description}
        og={seo_cards?.find((c) => c.variation === "default")}
        twitter={seo_cards?.find((c) => c.variation === "twitterCard")}
      />
      <div className="grid items-stretch gap-8 p-0 md:grid-cols-2 md:p-8">
        <Header />
        <SliceZone
          slices={slices}
          components={components}
          context={{ wines, articles }}
        />
      </div>
      <Instagram />
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", "hem", {
    fetchLinks: ["producer.title"],
  });
  const articles = await client.getAllByType("article", {
    orderings: {
      field: "my.article.date_published",
      direction: "desc",
    },
  });
  const wines = await client.getAllByType("wine", {
    fetchLinks: ["grape.title", "producer.title"],
  });
  const navigation = await client.getSingle("navigation");
  const marquee = await client.getSingle("marquee");
  const settings = await client.getSingle("settings");

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
