import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { capitalize } from "../../../lib/utils/text";
import Image from "next/image";
import * as prismicH from "@prismicio/helpers";
import { useRouter } from "next/router";

import Link from "next/link";
import Button from "../../Button";

import { useState } from "react";
import { LoadingAssetAnimation } from "../../Animations";

const ImageWithInternalLink = ({ data, size, aboveFold }) => {
  const [loaded, setLoaded] = useState(false);
  const { file, link } = data.primary;
  const { asPath } = useRouter();
  const isHome = asPath === "/" || asPath === "/hem";

  const containerClasses = clsx(
    size === "sm" ? "absolute inset-0" : "sticky top-8",
    isHome && "mx-2 md:mx-0"
  );

  return (
    <figure className={containerClasses}>
      <LoadingAssetAnimation loaded={loaded}>
        <Image
          src={file.url}
          width={file.dimensions.width}
          height={file.dimensions.height}
          className={clsx("rounded-md", size === "sm" && "h-full object-cover")}
          alt={
            file.alt ??
            prismicH.asText(link?.data?.title) ??
            "Ingen beskrivning tillgänglig"
          }
          priority={aboveFold}
          onLoad={(e) => setLoaded(true)}
        />
      </LoadingAssetAnimation>
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
          <Button className="bg-cadmiumGreen/80 p-4 backdrop-blur-lg">
            Besök profil
          </Button>
        </Link>
      </div>
    );

  return (
    <figcaption
      className={clsx(
        `absolute inset-x-0 bottom-0 m-2 block max-w-md rounded-md md:bottom-auto md:top-0 lg:m-4`,
        `flex flex-col justify-between gap-4 sm:flex-row sm:items-end`,
        `bg-white/30 backdrop-blur`,
        `p-4`
      )}
    >
      <h3 className="">
        <div role="doc-subtitle" className="font-mono">
          {translate(type)}
        </div>
        <div className="text-lg">{prismicH.asText(data?.title)}</div>
      </h3>
      <Link href={url} className="w-full sm:w-auto">
        <Button size="lg" className="whitespace-nowrap border">
          Läs mer
        </Button>
      </Link>
    </figcaption>
  );
};

const translate = (type) => {
  if (type === "producer") return "Producent";
};
