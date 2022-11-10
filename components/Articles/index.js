import { PrismicRichText } from "@prismicio/react";
import { useRouter } from "next/router";
import Image from "next/future/image";

export default function Articles({ articles }) {
  return (
    <section className="articles grid gap-12 p-4 pt-24 md:p-8 md:pt-24">
      {articles.map((article, i) => (
        <Article key={i} article={article} />
      ))}
      {articles.map((article, i) => (
        <Article key={i} article={article} />
      ))}
      {articles.map((article, i) => (
        <Article key={i} article={article} />
      ))}
    </section>
  );
}

const Article = ({ article }) => {
  const { push } = useRouter();

  const {
    date_published: date,
    hero_image: image,
    slices,
    title,
  } = article.data;

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  console.log(article);
  return (
    <article className="grid gap-4 text-center">
      <figure className="mx-auto max-w-sm">
        <Image
          src={image.url}
          width={image.dimensions.width}
          height={image.dimensions.height}
          alt={image.alt}
          className="rounded-md"
        />
      </figure>
      <header>
        <h2 className="mb-2 text-xl">
          <a
            onClick={() =>
              push(`/artikel/${article.uid}`, undefined, { shallow: true })
            }
            className="cursor-pointer"
          >
            <PrismicRichText field={title} />
          </a>
        </h2>
        <div role="doc-subtitle" className="font-mono">
          {new Date(date).toLocaleDateString("sv", options)}
        </div>
      </header>
    </article>
  );
};
