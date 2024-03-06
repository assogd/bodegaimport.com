import clsx from "clsx";
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { LoadingAssetAnimation } from "../../Animations";
import Button from "../../Button";
import { Context } from "../../../lib/context";

const Expand = ({ children, onTap }) => {
  return (
    <div className="absolute inset-x-0 bottom-0 flex max-w-full justify-start bg-gradient-to-t from-black/40 p-4">
      <Button onTap={onTap} className="flex items-center bg-white">
        <Image
          src={"/icons/photo_library.svg"}
          alt={"Photo library"}
          width="24"
          height="24"
          className="ml-[-.5em] mr-[.25em]"
          size="sm"
        />
        {children}
      </Button>
    </div>
  );
};

export default function MultipleImages({ data, size, aboveFold }) {
  const [overlay, setOverlay] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { settings, settingsHandler } = useContext(Context);

  const containerClasses = clsx(
    "overflow-hidden rounded",
    size === "sm" ? "absolute inset-0" : "sticky top-14"
  );
  const { url, dimensions, alt } = data.items[0].file.portrait_lg;

  return (
    <figure className={containerClasses}>
      <LoadingAssetAnimation loaded={loaded}>
        <Image
          src={url}
          width={dimensions.width}
          height={dimensions.height}
          alt={alt ?? "Ingen beskrivning tillgänglig"}
          className={clsx(
            "object-cover align-text-bottom",
            size === "sm" && "h-full object-cover"
          )}
          priority={aboveFold}
          onLoad={(e) => setLoaded(true)}
        />
        <Expand
          onTap={() =>
            settingsHandler({
              ...settings,
              slideshow: { items: data.items },
            })
          }
        >
          {data.items.length > 1 ? `${data.items.length} bilder` : `Förstora`}
        </Expand>
      </LoadingAssetAnimation>
    </figure>
  );
}
