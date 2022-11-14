import Image from "next/future/image";
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
      isArticle && "px-6 sm:px-8",
      isButton ? "flex items-baseline gap-4 justify-between" : "text-center"
    ),
  };

  return (
    <section className={className.section}>
      <header className={className.header}>
        {title && <PrismicRichText field={title} />}
        {isButton && variation === "wines" && (
          <div>
            <Link href={button_link.url}>
              <a>
                <Button size="md" className="bg-white">
                  {button_text ?? "Läs mer"}
                </Button>
              </a>
            </Link>
          </div>
        )}
      </header>
      {children}
      {isButton && isArticle && (
        <div className="px-4 sm:px-6">
          <Link href={button_link.url}>
            <a>
              <Button size="lg" className="bg-cadmiumGreen">
                {button_text ?? "Läs mer"}
              </Button>
            </a>
          </Link>
        </div>
      )}
    </section>
  );
};
