import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";

const Image = ({ data, size }) => {
  const { file, caption } = data.primary;

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
      {caption && size != "sm" && (
        <figcaption className="text-neutral-100 absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 py-4 px-6 text-sm">
          <PrismicRichText field={caption} />
        </figcaption>
      )}
    </figure>
  );
};

export default Image;
