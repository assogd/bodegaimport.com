import { AnimatePresence, motion } from "framer-motion";
import slugify from "slugify";
import * as prismicH from "@prismicio/helpers";
import Backdrop from "../Backdrop";
import Article from "../Article";

export default function Overlay({ articles, params }) {
  const article =
    articles &&
    articles.find(
      (article) =>
        article?.data.date_published === params.date &&
        article.uid === params.aid
    );

  if (!article) return null;

  return (
    <Backdrop className="flex flex-col items-center">
      <div className="relative w-full max-w-xl grow overflow-y-scroll">
        <div className="m-4 rounded-md bg-white pb-0">
          <Article article={article} />
        </div>
      </div>
    </Backdrop>
  );
}
