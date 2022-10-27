import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import Button from "../../Button";

const Default = ({ data, size }) => {
  const containerClasses = clsx(
    "font-mono text-monoBase",
    size != "sm" && "h-full",
    size === "sm" && "absolute inset-0 px-6 md:px-8 pt-2 pb-8"
  );

  return (
    <article className={containerClasses}>
      <header className="z-2 sticky top-0 left-0 bg-white py-4 pb-2 font-serif text-base">
        <PrismicRichText field={data.primary.title} />
      </header>
      <PrismicRichText field={data.primary.body} />
      <nav className="absolute inset-x-0 bottom-0 rounded bg-gradient-to-t from-white py-4 px-4 text-center md:px-10 md:py-8">
        <Button className="w-full border-0 border-solid bg-yellow font-serif text-base">
          Öppna
        </Button>
      </nav>
    </article>
  );
};

export default Default;
