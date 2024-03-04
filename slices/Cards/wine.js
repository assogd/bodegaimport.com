import Image from "next/image";
import { PrismicRichText } from "@prismicio/react";
import Button from "../../components/Button";
import Link from "next/link";
import * as prismicH from "@prismicio/helpers";
import clsx from "clsx";

export const Container = ({ children, slice }) => {
  const { variation } = slice;
  const { button_link, button_text, title } = slice.primary;
  const isButton = button_link.url;
  const isArticle = variation === "articles" || variation === "latestNews";

  const className = {
    section: clsx(
      "cards",
      variation,
      variation === "wines" && "col-span-full",
      isArticle &&
        "bg-wine-sylvaner border-md py-6 sm:pt-8 flex flex-col justify-between gap-6"
    ),
    header: clsx(
      "mb-4",
      variation === "wines" && "mt-8",
      "px-6 sm:px-8",
      isButton
        ? "flex items-baseline flex-row sm:flex-row items-center flex-wrap gap-x-4 justify-between"
        : "text-center"
    ),
  };

  return (
    <section className={className.section}>
      <header className={className.header}>
        {title && (
          <h3 className="inline-block text-lg leading-tight tracking-tight">
            {prismicH.asText(title)}
          </h3>
        )}
        {isButton && variation === "wines" && (
          <div>
            <Link href={button_link.url}>
              <Button size="mini" className="whitespace-nowrap font-mono">
                {button_text ?? "Läs mer"} -&gt;
              </Button>
            </Link>
          </div>
        )}
      </header>
      <div className="mx-[-0em] box-border max-w-[100vw]">{children}</div>
      {isButton && isArticle && (
        <div className="px-4 sm:px-6">
          <Link href={button_link.url}>
            <Button size="lg" className="bg-cadmiumGreen">
              {button_text ?? "Läs mer"}
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};
