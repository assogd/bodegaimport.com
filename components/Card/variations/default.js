import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import Button from "../../Button";
import Link from "next/link";
import * as prismicH from "@prismicio/helpers";
import slugify from "slugify";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const Default = ({ data, size, params }) => {
  const containerClasses = clsx(
    "font-mono text-monoBase bg-white rounded",
    size != "sm" && "relative min-h-full",
    size === "sm" && "absolute inset-0 px-6 sm:px-6 pt-2 pb-8"
  );

  return (
    <article className={containerClasses}>
      <header className="z-2 sticky top-0 left-0 bg-white pt-4 pb-2 font-serif text-base">
        <PrismicRichText field={data.primary.title} />
      </header>
      <PrismicRichText field={data.primary.body} />
      {params && <Expand params={params} data={data} />}
      {size === "lg" && <Close />}
    </article>
  );
};

export default Default;

const Expand = ({ params, data }) => {
  const { push } = useRouter();

  const getCardId =
    slugify(prismicH.asText(data.primary.title), { lower: true }) +
    "-" +
    data.id.slice(-4);

  return (
    <nav className="absolute inset-x-0 bottom-0 rounded bg-white px-4 pb-4 pt-0 text-center shadow-easeTop sm:px-4 sm:py-4">
      <Button
        onTap={() =>
          push(
            `/sortiment/${params.region.slug}/${params.producer.slug}/${getCardId}`,
            undefined,
            { shallow: true }
          )
        }
        className="w-full border-0 border-solid bg-yellow font-serif text-base"
      >
        Öppna
      </Button>
    </nav>
  );
};

const Close = ({ params }) => {
  const { push } = useRouter();

  return (
    <nav className="sticky inset-x-4 bottom-0 rounded bg-white px-0 pb-4 pt-0 text-center shadow-easeTop sm:px-10 sm:py-8">
      <Button
        className="w-full border border-solid bg-white font-serif text-base"
        onTap={() => push(`/sortiment`, undefined, { shallow: true })}
      >
        Stäng
      </Button>
    </nav>
  );
};
