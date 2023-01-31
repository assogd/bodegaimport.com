import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import Block from "./block";
import { useRouter } from "next/router";

import { AnimateInView } from "../../components/Animations";

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

  if (variation === "biggerIntroduction") {
    return (
      <AnimateInView
        className={clsx(
          "introduction hyphens col-span-full mx-auto max-w-[1400px] px-4 py-8 text-center",
          "mono-base font-mono text-base md:text-lg"
        )}
      >
        <PrismicRichText field={slice.primary.text} />
      </AnimateInView>
    );
  }

  if (variation === "introduction") {
    return (
      <AnimateInView
        className={clsx(
          "introduction hyphens col-span-full mx-auto max-w-4xl px-0 text-center",
          !query.aid && "py-12 pt-12 sm:pt-20",
          query.aid && "mono-base font-mono"
        )}
      >
        <PrismicRichText field={slice.primary.text} />
      </AnimateInView>
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
