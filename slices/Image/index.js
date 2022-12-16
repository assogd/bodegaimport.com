import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import Img from "next/future/image";

import { useRouter } from "next/router";

import { useState } from "react";
import { LoadingAssetAnimation } from "../../components/Animations";

const Image = ({ slice, index }) => {
  const [loaded, setLoaded] = useState(false);
  if (!slice?.primary) return null;
  const { image, caption } = slice.primary;
  const { query } = useRouter();
  const isLandscape = slice.variation === "landscape";

  return (
    <figure
      className={clsx(
        "relative",
        isLandscape && "col-span-full mx-auto max-w-4xl",
        query.aid && "mx-4",
        isLandscape &&
          query.aid &&
          "sm:mx-[-4em] sm:rounded-md sm:bg-white sm:p-4",
        !isLandscape && query.aid && "mx-12 sm:mx-36"
      )}
    >
      <LoadingAssetAnimation loaded={loaded}>
        <Img
          src={image.url}
          width={image.dimensions.width}
          height={image.dimensions.height}
          alt={image.alt ?? "Ingen beskrivning tillgänglig"}
          className={clsx(!query.aid && "rounded-md object-cover")}
          onLoadingComplete={(e) => setLoaded(true)}
        />
        {caption && (
          <figcaption
            className={clsx(
              query.aid || query.uid === "om-oss"
                ? "mx-1 mt-1 text-center text-sm"
                : "absolute inset-x-0 bottom-0 rounded-md bg-gradient-to-t from-black/80 p-6 pt-12 text-white"
            )}
          >
            <div className="mx-auto">
              <PrismicRichText field={caption} />
            </div>
          </figcaption>
        )}
      </LoadingAssetAnimation>
    </figure>
  );
};

export default Image;
