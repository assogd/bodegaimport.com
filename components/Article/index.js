import { PrismicRichText } from "@prismicio/react";
import Image from "next/future/image";
import { motion } from "framer-motion";
import { SliceZone } from "@prismicio/react";
import { components } from "../../slices";

export default function Article({ article }) {
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
