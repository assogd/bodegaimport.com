import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import Button from "../../Button";

const Default = ({ data, size }) => {
  const containerClasses = clsx(
    "font-mono text-monoBase",
    size != "sm" && "h-full",
    size === "sm" && "absolute inset-0 px-8 pt-2 pb-8"
  );

  return (
    <article className={containerClasses}>
      <header className="font-serif z-2 sticky top-0 left-0 bg-white py-4 pb-2 text-base">
        <PrismicRichText field={data.primary.title} />
      </header>
      <PrismicRichText field={data.primary.body} />
      <nav className="absolute inset-x-0 bottom-0 rounded bg-gradient-to-t from-white py-8 px-10 text-center">
        <Button className="font-serif bg-yellow w-full border-0 border-solid text-base">
          Läs mer
        </Button>
      </nav>
    </article>
  );
};

export default Default;
