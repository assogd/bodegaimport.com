import { AnimatePresence, motion } from "framer-motion";
import slugify from "slugify";
import * as prismicH from "@prismicio/helpers";
import Backdrop from "../Backdrop";
import Article from "../Article";
import Button from "../Button";
import Related from "../Articles/related";

import Meta from "../Meta";
import clsx from "clsx";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";

export default function Overlay({ articles, params, settings }) {
  const [isFull, setFull] = useState(false);

  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  });

  useEffect(() => setFull(!inView), [inView]);

  const { query, push } = useRouter();

  const article =
    articles &&
    articles.find(
      (article) =>
        article?.data.date_published === params.date &&
        article.uid === params.aid
    );

  if (!article) return null;
  const { seo_cards, seo_description, seo_title } = article.data;

  const related = articles
    .filter(
      (a) =>
        new Date(a.data.date_published) < new Date(article.data.date_published)
    )
    .concat(
      articles.filter(
        (a) =>
          new Date(a.data.date_published) >
          new Date(article.data.date_published)
      )
    )
    .slice(0, 4);

  return (
    <Backdrop className="flex flex-col items-center" bg={"bg-white/20"}>
      <Meta
        title={`${prismicH.asText(settings.data.siteTitle)}: ${
          prismicH.asText(article.data.title) ?? seo_title
        }`}
        description={seo_description}
        og={seo_cards?.find((c) => c.variation === "default")}
        twitter={seo_cards?.find((c) => c.variation === "twitterCard")}
      />
      <motion.div
        className={clsx(
          "transition-bg contain; relative w-full grow overflow-y-scroll overscroll-contain duration-1000",
          isFull ? "bg-white" : ""
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.25 } }}
        exit={{ opacity: 0 }}
      >
        <div
          className={clsx(
            "transition-scale relative mt-24 max-w-xl origin-top bg-white p-2 pb-0 duration-1000 sm:mx-auto",
            isFull ? "scale-100" : "scale-90 rounded-md"
          )}
        >
          <div
            ref={ref}
            className="pointer-events-none absolute inset-x-0 top-0 h-48"
          />
          <Article article={article} />
        </div>
        <Related articles={related} />
      </motion.div>
      <div className="fixed bottom-0 p-4">
        <Button
          onTap={() => push(`/${query.uid}`, undefined, { shallow: true })}
          className="bg-white shadow-lg"
          size="md"
        >
          Stäng
        </Button>
      </div>
    </Backdrop>
  );
}
