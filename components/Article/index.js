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
    <article>
      <motion.figure>
        <Image
          src={image.url}
          width={image.dimensions.width}
          height={image.dimensions.height}
          alt={image.alt}
          className="rounded-md"
        />
      </motion.figure>
      <div className="body">
        <header className="py-8 text-center">
          <h1 className="text-xl">
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
