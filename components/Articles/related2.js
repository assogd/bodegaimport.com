import Carousel from "../Carousel/container";
import { useRef, useState, useEffect } from "react";
import Image from "next/future/image";
import { motion } from "framer-motion";
import { PrismicRichText } from "@prismicio/react";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";
import * as prismicH from "@prismicio/helpers";
import Button from "../Button";
import Link from "next/link";

export default function Related({ articles }) {
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="related mb-[-7.5em] overflow-hidden rounded-t-2xl bg-peach pt-8  pb-20"
    >
      <header className="flex flex-col items-center justify-center gap-2 p-8 text-center sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h2 className="text-lg">Andra nyheter om dryck</h2>
        <Link href={"/nyheter"}>
          <a>
            <Button size="xs" className="font-mono">
              Se fler nyheter =&gt;
            </Button>
          </a>
        </Link>
      </header>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: inView ? "0" : 100 }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        <Carousel data={articles}>
          {articles.map((card, i) => (
            <div
              key={i}
              altclassname="w-5/6 shrink-0 sm:basis-40 snap-center scroll-mx-12 sm:w-auto sm:shrink sm:grow"
            >
              <Card article={card} i={i} />
            </div>
          ))}
        </Carousel>
      </motion.div>
    </section>
  );
}

export const Card = ({ article, i }) => {
  const { date_published: date, hero_image: image, title } = article.data;

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="relative">
      <div className="mb-4 text-center font-mono">
        ({String.fromCharCode(i + 65)})
      </div>
      <motion.figure>
        <Link href={`/nyhet/${article.uid}`}>
          <a>
            <div className="ratio relative h-0 pb-[75%]">
              <Image
                src={image.url}
                width={image.dimensions.width}
                height={image.dimensions.height}
                alt={image.alt ?? "Ingen beskrivning tillgänglig"}
                className="absolute inset-0 h-full rounded-md object-cover"
              />
            </div>
          </a>
        </Link>
      </motion.figure>
      <div className="px-1 pt-2">
        <span className="mb-[0.125em] inline-block sm:text-lg">
          <Link href={`/nyhet/${article.uid}`}>{prismicH.asText(title)}</Link>
        </span>
        <div className="font-mono">
          {new Date(date).toLocaleDateString("sv", options)}
        </div>
      </div>
    </div>
  );
};
