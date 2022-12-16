import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { capitalize } from "../../../lib/utils/text";
import Image from "next/future/image";
import * as prismicH from "@prismicio/helpers";
import { useRouter } from "next/router";

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
        className={clsx("rounded-md", size === "sm" && "h-full object-cover")}
        alt={file.alt ?? link?.data?.title ?? "Ingen beskrivning tillgänglig"}
      />
      <Figcaption link={link} size={size} />
    </figure>
  );
};

export default ImageWithInternalLink;

const Figcaption = ({ link, size }) => {
  const { asPath } = useRouter();
  const linkingObsolete = asPath.split("#")[0] === link.url;

  if (!link.url || linkingObsolete) return null;
  const { type, url, data } = link;

  if (size === "sm")
    return (
      <div className={`absolute inset-x-2 bottom-2 sm:inset-x-4 sm:bottom-4`}>
        <Link href={url}>
          <a>
            <Button className="bg-cadmiumGreen/80 p-4 backdrop-blur-lg">
              Besök profil
            </Button>
          </a>
        </Link>
      </div>
    );

  return (
    <figcaption
      className={`absolute inset-x-2 bottom-2 flex items-end justify-between gap-4 rounded-md bg-white/40 p-4 backdrop-blur-lg sm:inset-x-4 sm:bottom-4`}
    >
      <h3>
        <div role="doc-subtitle">{capitalize(type)}</div>
        <div className="text-lg">{prismicH.asText(data?.title)}</div>
      </h3>
      <Link href={url}>
        <a>
          <Button className="whitespace-nowrap border">Läs mer</Button>
        </a>
      </Link>
    </figcaption>
  );
};
