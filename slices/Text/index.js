import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import Block from "./block";

import { Bounded } from "../../components/Bounded";

const Text = ({ slice }) => {
  const { variation } = slice;

  if (variation === "block") {
    return (
      <Block data={slice.primary}>
        <PrismicRichText field={slice.primary.text} />
      </Block>
    );
  }

  return (
    <section
      className={clsx(
        "hyphens mx-auto max-w-4xl py-20 px-4 text-center",
        variation === "mono" && "font-mono"
      )}
    >
      <PrismicRichText field={slice.primary.text} />
    </section>
  );
};

export default Text;
