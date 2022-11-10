import { PrismicRichText } from "@prismicio/react";
import { useRouter } from "next/router";
import Image from "next/future/image";
import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { isMobile } from "react-device-detect";

export default function Articles({ articles }) {
  const className = {
    section: clsx(
      "articles grid p-4 pt-12 md:p-8 md:pt-16",
      isMobile ? "gap-10" : "gap-4"
    ),
  };
  return (
    <section className={className.section}>
      {articles.map((article, i) => (
        <Article key={i} article={article} />
      ))}
      {articles.map((article, i) => (
        <Article key={i} article={article} />
      ))}
      {articles.map((article, i) => (
        <Article key={i} article={article} />
      ))}
    </section>
  );
}

const Article = ({ article }) => {
  const [isHover, setHover] = useState(false);
  const { push } = useRouter();

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
    figure: {
      mobile: clsx("mx-auto max-w-sm"),
      desktop: clsx(
        "absolute left-[50%] max-w-sm top-[50%] translate-x-[-50%] translate-y-[-55%] pointer-events-none z-10"
      ),
    },
  };

  return (
    <article className="relative grid gap-2 text-center">
      <motion.figure
        animate={isHover || isMobile ? { opacity: 1 } : { opacity: 0 }}
        className={
          isMobile ? className.figure.mobile : className.figure.desktop
        }
      >
        <Image
          src={image.url}
          width={image.dimensions.width}
          height={image.dimensions.height}
          alt={image.alt}
          className="rounded-md"
        />
      </motion.figure>
      <header className="relative">
        <motion.h2
          className="md:text-xxl inline-block text-lg"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <a
            onClick={() =>
              push(`/nyheter/${date}/${article.uid}`, undefined, {
                shallow: true,
              })
            }
            className="cursor-pointer"
          >
            <PrismicRichText field={title} />
          </a>
        </motion.h2>
        <div role="doc-subtitle" className="font-mono">
          {new Date(date).toLocaleDateString("sv", options)}
        </div>
      </header>
    </article>
  );
};
