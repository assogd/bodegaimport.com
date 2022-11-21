import { AnimatePresence, motion } from "framer-motion";
import slugify from "slugify";
import * as prismicH from "@prismicio/helpers";
import Card from "../Card/";
import Backdrop from "../Backdrop";
import Article from "../Article";
import { useRouter } from "next/router";
import Button from "../Button";
import clsx from "clsx";

export default function Overlay({ data, size, params }) {
  if (!params.card.slug) return null;

  const getCardId = (title, id) =>
    title &&
    slugify(prismicH.asText(title), { lower: true }) + "-" + id.slice(-4);

  const card = data.find(
    (c) => getCardId(c.primary.title, c.id) === params.card.slug
  );

  if (!card) return null;

  const bg = "bg-purple/60";

  return (
    <Backdrop className="overlay flex flex-col items-center" bg={bg}>
      <div className="relative w-full">
        <Header params={params} />
        <Article article={card} variant={"expandedCard"} />
        <Close bg={"from-purple"} />
      </div>
    </Backdrop>
  );
}

const Header = ({ params }) => (
  <header className="sticky top-0 z-10 p-8 text-center">
    {params.region.title.region},{" "}
    <span className="leading-wider text-sm uppercase">
      {params.region.title.country.slice(0, 3)}
    </span>{" "}
    / {params.producer.title}
  </header>
);

const Close = ({ bg }) => {
  const { push, query } = useRouter();

  console.log(useRouter());

  return (
    <nav
      className={clsx(
        "sticky inset-x-0 bottom-0 rounded bg-gradient-to-t px-4 pb-2 pt-24 pt-0 text-center",
        bg
      )}
    >
      <Button
        className="w-full max-w-sm bg-white font-serif text-base"
        onTap={() => push(`/${query.uid}`, undefined, { shallow: true })}
      >
        Stäng
      </Button>
    </nav>
  );
};
