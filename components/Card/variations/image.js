import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Img from "next/future/image";
import clsx from "clsx";
import { useMemo } from "react";
import Button from "../../Button";
import Link from "next/link";

const Caption = ({ caption, render }) =>
  render && (
    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 py-4 px-6 text-sm text-neutral-100">
      <PrismicRichText field={caption} />
    </figcaption>
  );

const CTA = ({ href, render }) =>
  render && (
    <div className="absolute inset-x-0 bottom-0 rounded-full bg-gradient-to-t from-black/50 p-4">
      <Link href={href}>
        <a>
          <Button className="bg-cadmiumGreen/80 backdrop-blur">
            Besök profil
          </Button>
        </a>
      </Link>
    </div>
  );

const Image = ({ data, size, i, params, aboveFold }) => {
  const { file, caption } = data.primary;

  const containerClasses = clsx(
    "overflow-hidden rounded",
    size === "sm" ? "absolute inset-0" : "sticky top-14"
  );

  const imageLayout = size === "sm" ? "fill" : "responsive";
  const objectFit = size === "sm" ? "cover" : "none";

  return (
    <figure className={containerClasses}>
      <Img
        src={file.url}
        width={file.dimensions.width}
        height={file.dimensions.height}
        alt={file.alt ?? "Ingen beskrivning tillgänglig"}
        className={clsx(
          "align-text-bottom",
          size === "sm" && "h-full object-cover"
        )}
        priority={aboveFold}
      />
      <Caption render={caption && size != "sm"} caption={caption} />
      <CTA
        render={i === 0 && size === "sm" && params?.producer?.slug}
        href={`/producent/${params?.producer?.slug}`}
      />
    </figure>
  );
};

export default Image;
