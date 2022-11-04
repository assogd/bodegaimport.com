import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { capitalize } from "../../../lib/utils/text";

import Link from "next/link";
import Button from "../../Button";

const Image = ({ data, size }) => {
  const { file, link } = data.primary;

  const containerClasses = clsx(
    "overflow-hidden rounded",
    size === "sm" ? "absolute inset-0" : "sticky top-14"
  );

  const imageLayout = size === "sm" ? "fill" : "responsive";
  const objectFit = size === "sm" ? "cover" : "none";

  return (
    <figure className={containerClasses}>
      <PrismicNextImage
        field={file}
        layout={imageLayout}
        objectFit={objectFit}
      />
      <Figcaption link={link} />
    </figure>
  );
};

export default Image;

const Figcaption = ({ link }) => {
  const { type, url, data } = link;

  return (
    <figcaption
      className={`absolute inset-x-2 bottom-2 flex items-end justify-between gap-4 rounded-md bg-white/40 p-4 backdrop-blur-lg`}
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
