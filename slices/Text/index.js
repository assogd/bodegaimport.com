import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import Block from "./block";
import { useRouter } from "next/router";

const Text = ({ slice }) => {
  const { variation } = slice;
  const { query } = useRouter();

  if (variation === "block") {
    return (
      <Block data={slice.primary}>
        <PrismicRichText field={slice.primary.text} />
      </Block>
    );
  }

  if (variation === "introduction") {
    return (
      <section
        className={clsx(
          "introduction hyphens col-span-full mx-auto max-w-4xl px-0 text-center",
          !query.aid && "py-12 pt-12 sm:pt-20",
          query.aid && "mono-base font-mono"
        )}
      >
        <PrismicRichText field={slice.primary.text} />
      </section>
    );
  }

  return (
    <section
      className={clsx(
        "hyphens mx-auto max-w-xl text-center",
        variation === "mono" && "font-mono"
      )}
    >
      <PrismicRichText field={slice.primary.text} />
    </section>
  );
};

export default Text;
