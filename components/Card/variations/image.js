import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Img from "next/image";
import clsx from "clsx";
import { useMemo } from "react";
import Button from "../../Button";
import Link from "next/link";
import { useRouter } from "next/router";

import { useState } from "react";
import { LoadingAssetAnimation } from "../../Animations";

const Caption = ({ caption, render }) =>
  render && (
    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 px-6 py-4 text-sm text-neutral-100">
      <PrismicRichText field={caption} />
    </figcaption>
  );

const CTA = ({ href, render }) =>
  render && (
    <div className="absolute inset-x-0 bottom-0 rounded-full bg-gradient-to-t from-black/50 p-4">
      <Link href={href}>
        <Button className="bg-cadmiumGreen/80 backdrop-blur">
          Besök profil
        </Button>
      </Link>
    </div>
  );

const Image = ({ data, size, i, params, aboveFold }) => {
  const { file, caption } = data.primary;
  const [loaded, setLoaded] = useState(false);

  const { asPath } = useRouter();
  const isHome = asPath === "/" || asPath === "/hem";

  const containerClasses = clsx(
    "overflow-hidden rounded",
    size === "sm" ? "absolute inset-0" : "absolute inset-0 sm:sticky sm:top-14",
    isHome && "px-2 md:px-0"
  );

  return (
    <figure className={containerClasses}>
      <LoadingAssetAnimation loaded={loaded}>
        <Img
          src={file.url}
          width={file.dimensions.width}
          height={file.dimensions.height}
          alt={file.alt ?? "Ingen beskrivning tillgänglig"}
          className={clsx(
            "align-text-bottom",
            size === "sm" ? "h-full object-cover" : "h-full object-cover"
          )}
          priority={aboveFold}
          onLoad={(e) => setLoaded(true)}
        />
        <Caption render={caption && size != "sm"} caption={caption} />
        <CTA
          render={i === 0 && size === "sm" && params?.producer?.slug}
          href={`/producent/${params?.producer?.slug}`}
        />
      </LoadingAssetAnimation>
    </figure>
  );
};

export default Image;
