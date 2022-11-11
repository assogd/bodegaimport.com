import { AnimatePresence, motion } from "framer-motion";
import slugify from "slugify";
import * as prismicH from "@prismicio/helpers";
import Backdrop from "../Backdrop";
import Article from "../Article";
import Button from "../Button";

import clsx from "clsx";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";

export default function Overlay({ articles, params }) {
  const article =
    articles &&
    articles.find(
      (article) =>
        article?.data.date_published === params.date &&
        article.uid === params.aid
    );

  if (!article) return null;

  const [isFull, setFull] = useState(false);

  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  });

  useEffect(() => setFull(!inView), [inView]);

  const { query, push } = useRouter();

  return (
    <Backdrop
      className="flex flex-col items-center"
      backdropStyles={"bg-white/20"}
    >
      <div
        className={clsx(
          "relative w-full grow overflow-y-scroll transition-all duration-500",
          isFull ? "bg-white" : ""
        )}
      >
        <div
          className={clsx(
            "relative mt-24 max-w-xl origin-top bg-white p-2 pb-0 transition-all duration-500 md:mx-auto",
            isFull ? "scale-100" : "scale-90 rounded-md"
          )}
        >
          <div
            ref={ref}
            className="pointer-events-none absolute inset-x-0 top-0 h-48"
          />
          <Article article={article} />
        </div>
      </div>
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
