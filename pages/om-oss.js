import Meta from "../components/Meta";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import * as prismic from "@prismicio/client";

import { createClient } from "../prismicio";
import { components } from "../slices";
import { Layout } from "../components/Layout";

import { Heading } from "../components/Heading";
import ListOfProducers from "../components/ListOfProducers";
import Articles from "../components/Articles";
import Header from "../components/Header/base/";

import clsx from "clsx";
import slugify from "slugify";

import { useRouter } from "next/router";

import { AnimatePresence } from "framer-motion";

import Section from "../components/Section";

import useAssoCookie from "../lib/hooks/useAssoCookie";
import { useState, useEffect } from "react";

const Page = ({ page, navigation, marquee, settings }) => {
  const { seo_cards, seo_description, seo_title } = page.data;

  return (
    <Layout
      navigation={navigation}
      marquee={marquee}
      settings={settings}
      logotype={{ alwaysCentered: false }}
      className={clsx("")}
      bg={"bg-paleYellow"}
    >
      <Meta
        title={`${prismicH.asText(settings.data.siteTitle)}: ${
          prismicH.asText(page.data.title) ?? seo_title
        }`}
        description={seo_description}
        og={seo_cards?.find((c) => c.variation === "default")}
        twitter={seo_cards?.find((c) => c.variation === "twitterCard")}
      />
      <Section className="relative grid gap-6 px-4 pb-8 sm:gap-8 sm:px-4">
        <Header
          placement={{ col: "center", row: "first" }}
          className="relative lg:pt-6"
        >
          <Heading size="xl">{prismicH.asText(page.data.title)}</Heading>
        </Header>
        <SliceZone slices={page.data.slices} components={components} />
      </Section>
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const navigation = await client.getSingle("navigation");
  const marquee = await client.getSingle("marquee");
  const settings = await client.getSingle("settings");
  const page = await client.getByUID("page", "om-oss", {});

  return {
    props: {
      page,
      navigation,
      marquee,
      settings,
    },
  };
}
