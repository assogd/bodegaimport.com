import { AnimatePresence, motion } from "framer-motion";
import slugify from "slugify";
import * as prismicH from "@prismicio/helpers";
import Card from "../Card/";

export default function Overlay({ data, size, params }) {
  if (!params.card.slug) return null;

  const getCardId = (title, id) =>
    title &&
    slugify(prismicH.asText(title), { lower: true }) + "-" + id.slice(-4);

  const card = data.find(
    (c) => getCardId(c.primary.title, c.id) === params.card.slug
  );
  console.log(params);

  if (!card) return null;

  return (
    <section className="overlay fixed inset-0 z-40 flex max-h-screen flex-col items-center">
      <div className="absolute inset-0 bg-black/90" />
      <Header params={params} />
      <div className="relative w-full max-w-lg grow">
        <div className="absolute inset-0 py-0 px-4 pb-0">
          <Card
            data={card}
            size="lg"
            className="max-h-full overflow-y-scroll rounded-t"
          />
        </div>
      </div>
    </section>
  );
}

const Header = ({ params }) => (
  <header className="relative z-10 p-8 text-center text-white">
    {params.region.title.region},{" "}
    <span className="leading-wider text-sm uppercase">
      {params.region.title.country.slice(0, 3)}
    </span>{" "}
    / {params.producer.title}
  </header>
);
