import { AnimatePresence, motion } from "framer-motion";
import slugify from "slugify";
import * as prismicH from "@prismicio/helpers";
import Card from "../Card/";
import Backdrop from "../Backdrop";
import Article from "../Article";

export default function Overlay({ data, size, params }) {
  if (!params.card.slug) return null;

  const getCardId = (title, id) =>
    title &&
    slugify(prismicH.asText(title), { lower: true }) + "-" + id.slice(-4);

  const card = data.find(
    (c) => getCardId(c.primary.title, c.id) === params.card.slug
  );

  if (!card) return null;

  return (
    <Backdrop className="overlay flex flex-col items-center" bg="bg-purple/60">
      <Header params={params} />
      <div className="relative w-full max-w-lg grow">
        <div className="absolute inset-0 py-0 px-4 pb-0">
          <Article data={card} variant={"expandedCard"} />
        </div>
      </div>
    </Backdrop>
  );
}

const Header = ({ params }) => (
  <header className="relative z-10 p-8 text-center">
    {params.region.title.region},{" "}
    <span className="leading-wider text-sm uppercase">
      {params.region.title.country.slice(0, 3)}
    </span>{" "}
    / {params.producer.title}
  </header>
);
