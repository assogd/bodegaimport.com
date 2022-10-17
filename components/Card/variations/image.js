import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

const Image = ({ data }) => {
  const { file, caption } = data.primary;

  return (
    <figure className="sticky top-14 overflow-hidden rounded">
      <PrismicNextImage field={file} layout="responsive" />
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 py-4 px-6 text-sm text-gray-100">
          <PrismicRichText field={caption} />
        </figcaption>
      )}
    </figure>
  );
};

export default Image;
