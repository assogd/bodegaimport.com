import * as prismicH from "@prismicio/helpers";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import Img from "next/future/image";

import { useRouter } from "next/router";

const Image = ({ slice, index }) => {
  if (!slice?.primary) return null;
  const { image, caption } = slice.primary;
  const { query } = useRouter();
  const isLandscape = slice.variation === "landscape";

  return (
    <figure
      className={clsx(
        "relative",
        isLandscape && "col-span-full",
        query.aid && "mx-4",
        isLandscape &&
          query.aid &&
          "md:mx-[-4em] md:rounded-md md:bg-white md:p-4",
        !isLandscape && query.aid && "mx-12 md:mx-36"
      )}
    >
      <Img
        src={image.url}
        width={image.dimensions.width}
        height={image.dimensions.height}
        alt={image.alt ?? "Ingen beskrivning tillgänglig"}
        className={clsx(!query.aid && "rounded-md")}
      />
      {caption && (
        <figcaption
          className={clsx(
            query.aid
              ? "mt-1 text-sm md:text-center"
              : "absolute inset-x-0 bottom-0 rounded-md bg-gradient-to-t from-black/80 p-4 pt-12 text-white"
          )}
        >
          <div className="max-w-sm md:mx-auto ">
            <PrismicRichText field={caption} />
          </div>
        </figcaption>
      )}
    </figure>
  );
};

export default Image;
