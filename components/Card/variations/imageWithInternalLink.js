import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { capitalize } from "../../../lib/utils/text";
import Image from "next/future/image";

import Link from "next/link";
import Button from "../../Button";

const ImageWithInternalLink = ({ data, size }) => {
  const { file, link } = data.primary;

  const containerClasses = clsx(
    size === "sm" ? "absolute inset-0" : "sticky top-8"
  );

  return (
    <figure className={containerClasses}>
      <Image
        src={file.url}
        width={file.dimensions.width}
        height={file.dimensions.height}
        className="rounded-md"
        alt={file.alt ?? link.data.title}
      />
      <Figcaption link={link} />
    </figure>
  );
};

export default ImageWithInternalLink;

const Figcaption = ({ link }) => {
  const { type, url, data } = link;

  return (
    <figcaption
      className={`absolute inset-x-2 bottom-2 flex items-end justify-between gap-4 rounded-md bg-white/40 p-4 backdrop-blur-lg md:inset-x-4 md:bottom-4`}
    >
      <h3>
        <div role="doc-subtitle">{capitalize(type)}</div>
        <div className="text-lg">{data.title}</div>
      </h3>
      <Link href={url}>
        <a>
          <Button className="border">Läs mer</Button>
        </a>
      </Link>
    </figcaption>
  );
};
