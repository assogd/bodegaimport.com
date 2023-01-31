import { PrismicRichText } from "@prismicio/react";
import { useRouter } from "next/router";
import Image from "next/future/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { isMobile } from "react-device-detect";

export default function Articles({ articles }) {
  const [isStateMobile, setStateMobile] = useState(false);
  useEffect(() => setStateMobile(isMobile), []);

  const className = {
    section: clsx(
      "articles grid px-2 pt-12 pb-36 sm:px-8 sm:pt-16",
      isStateMobile ? "gap-10" : "gap-6"
    ),
  };
  return (
    <section className={className.section}>
      {articles.map((article, i) => (
        <Article key={i} article={article} />
      ))}
    </section>
  );
}

const Article = ({ article }) => {
  const [isHover, setHover] = useState(false);
  const [isStateMobile, setStateMobile] = useState(false);
  useEffect(() => setStateMobile(isMobile), []);

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
        : "absolute left-[50%] max-w-sm top-[50%] translate-x-[-50%] translate-y-[-55%] pointer-events-none z-10"
    ),
  };

  return (
    <article className="relative grid gap-2 text-center">
      <motion.figure
        initial={{ opacity: 0 }}
        animate={isHover || isStateMobile ? { opacity: 1 } : { opacity: 0 }}
        className={className.figure}
      >
        <A href={`/nyhet/${article.uid}`}>
          <Image
            src={image.url}
            width={image.dimensions.width}
            height={image.dimensions.height}
            alt={image.alt ?? "Ingen beskrivning tillgänglig"}
            className="rounded-md"
          />
        </A>
      </motion.figure>
      <header className="relative">
        <motion.h2
          className="inline-block pb-1 text-lg sm:text-xxl"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <A href={`/nyhet/${article.uid}`}>
            <PrismicRichText field={title} />
          </A>
        </motion.h2>
        <div role="doc-subtitle" className="font-mono">
          {new Date(date).toLocaleDateString("sv", options)}
        </div>
      </header>
    </article>
  );
};

const A = ({ children, href }) => {
  const { push } = useRouter();

  return (
    <a
      onClick={() =>
        push(href, undefined, {
          shallow: true,
        })
      }
      className="cursor-pointer"
    >
      {children}
    </a>
  );
};
