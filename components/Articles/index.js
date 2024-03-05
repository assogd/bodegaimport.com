import { PrismicRichText } from "@prismicio/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { isMobile } from "react-device-detect";
import { AnimateInView } from "../Animations";
import Link from "next/link";

export default function Articles({ articles }) {
  const [isStateMobile, setStateMobile] = useState(false);
  const [isHover, setHover] = useState(null);
  useEffect(() => setStateMobile(isMobile), []);

  const className = {
    section: clsx(
      "articles grid px-2 pt-12 pb-36 sm:px-8 sm:pt-16",
      isStateMobile ? "gap-10" : "gap-6"
    ),
  };
  return (
    <AnimateInView className={className.section}>
      {articles.map((article, i) => (
        <motion.article
          key={article.uid}
          className="relative grid gap-2 text-center"
          onMouseEnter={() => setHover(i)}
        >
          <Article
            article={article}
            renderImage={i === isHover}
            mobileState={[isStateMobile, setStateMobile]}
          />
        </motion.article>
      ))}
    </AnimateInView>
  );
}

const Article = ({ article, mobileState, renderImage }) => {
  const [isStateMobile, setStateMobile] = mobileState;

  const {
    date_published: date,
    hero_image: image,
    slices,
    title,
  } = article.data;

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const className = {
    figure: clsx(
      isStateMobile
        ? "mx-auto max-w-sm"
        : "absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-55%] pointer-events-none z-10 max-w-xs"
    ),
  };

  return (
    <>
      <motion.figure
        initial={{ opacity: 0 }}
        animate={renderImage || isStateMobile ? { opacity: 1 } : { opacity: 0 }}
        className={className.figure}
      >
        <Link href={`/nyhet/${article.uid}`}>
          <Image
            src={image.sm.url}
            width={image.sm.dimensions.width}
            height={image.sm.dimensions.height}
            alt={image.alt ?? "Ingen beskrivning tillgänglig"}
            className="rounded-sm"
          />
        </Link>
      </motion.figure>
      <header className="relative">
        <motion.h2 className="inline-block pb-1 text-lg sm:text-xxl">
          <Link href={`/nyhet/${article.uid}`}>
            <PrismicRichText field={title} />
          </Link>
        </motion.h2>
        <div role="doc-subtitle" className="font-mono">
          {new Date(date).toLocaleDateString("sv", options)}
        </div>
      </header>
    </>
  );
};
