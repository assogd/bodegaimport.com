import { PrismicRichText } from "@prismicio/react";

const Default = ({ data }) => {
  return (
    <article className="font-mono text-monoBase h-full">
      <header className="font-serif z-2 sticky top-0 left-0 bg-white py-4 pb-2 text-base">
        <PrismicRichText field={data.primary.title} />
      </header>
      <PrismicRichText field={data.primary.body} />
    </article>
  );
};

export default Default;
