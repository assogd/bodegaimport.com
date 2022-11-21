import { PrismicRichText } from "@prismicio/react";
import Image from "next/future/image";
import { motion } from "framer-motion";
import { SliceZone } from "@prismicio/react";
import { components } from "../../slices";
import * as prismicH from "@prismicio/helpers";

const Slice = ({ article }) => {
  const { body, title } = article.primary;

  return (
    <article className="relative mx-auto max-w-2xl px-4 pb-8 text-center sm:px-8">
      <h1 className="text-xxl pt-8 pb-8 text-center">
        {prismicH.asText(title)}
      </h1>
      <PrismicRichText field={body} />
    </article>
  );
};

export default function Article({ article }) {
  if (article?.variation) {
    return <Slice article={article} />;
  }

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
    <article className="min-h-[65vh] pb-24">
      <motion.figure className="hidden">
        <Image
          src={image.url}
          width={image.dimensions.width}
          height={image.dimensions.height}
          alt={image.alt ?? "Ingen beskrivning tillgänglig"}
          className="rounded-md"
        />
      </motion.figure>
      <div className="body grid gap-4">
        <header className="pt-8 pb-4 text-center">
          <h1 className="mb-1 text-xl">
            <PrismicRichText field={title} />
          </h1>
          <div role="doc-subtitle" className="font-mono">
            {new Date(date).toLocaleDateString("sv", options)}
          </div>
        </header>
        <SliceZone slices={slices} components={components} />
      </div>
    </article>
  );
}
