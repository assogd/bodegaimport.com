import Meta from "../components/Meta";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import * as prismic from "@prismicio/client";

import { createClient } from "../prismicio";
import { components } from "../slices";
import { Layout } from "../components/Layout";

import { Heading } from "../components/Heading";
import Header from "../components/Header/base/";
import clsx from "clsx";
import Section from "../components/Section";

import Card from "../components/Card/variations/wine";
import Instagram from "../components/Instagram";

const Page = ({ page, navigation, marquee, settings, wines }) => {
  const { seo_cards, seo_description, seo_title } = page.data;

  console.log(wines.results);

  return (
    <Layout
      navigation={navigation}
      marquee={marquee}
      settings={settings}
      className=""
      logotype={{ alwaysCentered: false }}
    >
      <Section className="relative grid gap-6 px-4 pb-8 sm:gap-8 sm:px-4">
        <Header
          placement={{ col: "center", row: "first" }}
          className="relative lg:pt-6"
        >
          <Heading size="xl">{prismicH.asText(page.data.title)}</Heading>
        </Header>
        <SliceZone slices={page.data.slices} components={components} />
      </Section>
      <Section className="relative grid gap-6 px-4 pb-8 sm:gap-8 sm:px-4">
        <h3 className="mb-4 mt-8 inline-block text-center font-serif text-lg tracking-tight first:mt-0 last:mb-0 sm:text-lg">
          Aktuellt sortiment
        </h3>
        <div className="mx-auto flex w-full flex-wrap justify-center gap-8">
          {!wines?.results || wines?.results.length === 0 ? (
            <div className=" text-center">
              Allt verkar vara slutsålt för tillfället.
            </div>
          ) : (
            wines.results.map((wine) => (
              <div className="w-full max-w-sm grow basis-0">
                <Card
                  key={wine.id}
                  data={wine}
                  listProducer
                  href={`${wine.data.producer.url}#${wine.uid}`}
                />
              </div>
            ))
          )}
        </div>
      </Section>
      <Instagram />
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });
  const navigation = await client.getSingle("navigation");
  const marquee = await client.getSingle("marquee");
  const settings = await client.getSingle("settings");
  const page = await client.getByUID("page", "systemet", {});

  const wines = await client.query(
    [
      prismic.Predicates.at("document.type", "wine"),
      prismic.Predicates.any("my.wine.resellers.segment", [
        "Both",
        "Private consumer",
      ]),
    ],
    {
      fetchLinks: ["producer.title", "producer.region", "grape.title"],
    }
  );

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
