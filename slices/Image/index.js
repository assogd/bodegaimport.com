import * as prismicH from "@prismicio/helpers";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import Img from "next/future/image";

import { Bounded } from "../../components/Bounded";

const Image = ({ slice, index }) => {
  if (!slice?.primary) return null;
  const { image, caption } = slice.primary;

  return (
    <figure
      className={clsx(
        "relative",
        slice.variation === "landscape" && "col-span-full"
      )}
    >
      <Img
        src={image.url}
        width={image.dimensions.width}
        height={image.dimensions.height}
        alt={image.alt}
        className="rounded-md"
      />
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 rounded-md bg-gradient-to-t from-black/80 p-4 pt-12 text-white">
          <div className="max-w-sm">
            <PrismicRichText field={caption} />
          </div>
        </figcaption>
      )}
    </figure>
  );
};

export default Image;
