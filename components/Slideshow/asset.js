import { useState } from "react";
import { motion } from "framer-motion";
import { LoadingAssetAnimation } from "../Animations";
import clsx from "clsx";
import Image from "next/image";

const Asset = ({ data, priority, inView, dir }) => {
  const [loaded, setLoaded] = useState(false);
  const ratio = data.file.dimensions.width / data.file.dimensions.height;
  const isPortrait = data.file.dimensions.width < data.file.dimensions.height;
  const { url, dimensions, alt } = isPortrait
    ? data.file.portrait_lg
    : data.file.landscape_lg;

  return (
    <motion.figure
      key={url}
      initial={{ opacity: 0, x: priority || inView ? 0 : "100%" }}
      animate={{
        opacity: inView ? 1 : 0,
        x: inView ? 0 : dir,
      }}
      exit={{ opacity: 0 }}
      className="absolute inset-0"
      transition={{ type: "tween" }}
    >
      <LoadingAssetAnimation loaded={loaded}>
        <Image
          src={url}
          width={dimensions.width}
          height={dimensions.height}
          alt={alt ?? "Ingen beskrivning tillgänglig"}
          className={clsx("h-full object-contain align-text-bottom")}
          priority={priority}
          onLoad={(e) => setLoaded(true)}
        />
      </LoadingAssetAnimation>
      <Caption data={data.caption} />
    </motion.figure>
  );
};

const Caption = ({ data }) => {
  if (!data.length) return null;

  return (
    <figcaption className="absolute inset-x-0 bottom-0 rounded-md bg-gradient-to-t from-black/20 p-4 text-center font-mono text-sm text-white">
      <div className="mx-auto max-w-4xl">
        <PrismicRichText field={data} />
      </div>
    </figcaption>
  );
};

export default Asset;
