import Carousel from "../Carousel/container";
import { useRef, useState, useEffect } from "react";
import Image from "next/future/image";
import { motion } from "framer-motion";
import { PrismicRichText } from "@prismicio/react";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";
import * as prismicH from "@prismicio/helpers";

export default function Related({ articles }) {
  const { ref, inView } = useInView({ threshold: 0.25 });

  return (
    <section ref={ref} className="related overflow-hidden bg-white pt-8 pb-24">
      <h2 className="mb-8 text-center text-lg">Andra nyheter om dryck</h2>
      <motion.div
        initial={{ y: "50%" }}
        animate={{ y: inView ? "0" : "50%" }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        <Carousel data={articles}>
          {articles.map((card, i) => (
            <div
              key={i}
              altclassname="w-5/6 shrink-0 sm:basis-40 snap-center scroll-mx-12 sm:w-auto sm:shrink sm:grow"
            >
              <Card article={card} />
            </div>
          ))}
        </Carousel>
      </motion.div>
    </section>
  );
}

export const Card = ({ article }) => {
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

  return (
    <div className="relative">
      <motion.figure>
        <A href={`/nyhet/${article.uid}`}>
          <div className="ratio relative h-0 pb-[75%]">
            <Image
              src={image.url}
              width={image.dimensions.width}
              height={image.dimensions.height}
              alt={image.alt ?? "Ingen beskrivning tillgänglig"}
              className="absolute inset-0 h-full rounded-md object-cover"
            />
          </div>
        </A>
      </motion.figure>
      <div className="px-1 pt-2">
        <span className="mb-[0.125em] inline-block sm:text-lg">
          <A href={`/nyhet/${article.uid}`}>{prismicH.asText(title)}</A>
        </span>
        <div className="font-mono">
          {new Date(date).toLocaleDateString("sv", options)}
        </div>
      </div>
    </div>
  );
};

const A = ({ children, href }) => {
  const { push } = useRouter();

  return (
    <a
      onClick={() =>
        push(href, undefined, {
          shallow: true,
          scroll: true,
        })
      }
      className="cursor-pointer"
    >
      {children}
    </a>
  );
};
