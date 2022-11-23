import useSWR from "swr";
import Carousel from "../Carousel/container";
import Image from "next/future/image";
import { useState } from "react";

const IGAccessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
const fetcher = (...args) => fetch(...args).then((res) => res.json());

import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";

import clsx from "clsx";

export default function Instagram() {
  const [active, setActive] = useState(null);

  const query = `id,caption,media_type,media_url,permalink,thumbnail_url`;
  const { data, error } = useSWR(
    `https://graph.instagram.com/me/media?fields=${query}&access_token=${IGAccessToken}`,
    fetcher
  );

  console.log({ data, error });

  if (error) return null;

  if (!data) return <div>loading...</div>;

  return (
    <section className="bg-peach mb-[-7.5em] rounded-t-2xl pb-24">
      <header className="p-8">
        <h2 className="text-lg">Senaste från socialen</h2>
      </header>
      {data?.data && (
        <Carousel data={data.data}>
          {data.data.map((entry, i) => (
            <Entry
              key={entry.id}
              entry={entry}
              i={i}
              state={{ active, setActive }}
            />
          ))}
        </Carousel>
      )}
    </section>
  );
}

const Entry = ({ entry, state, i }) => {
  const isActive = state.active === i;
  const { caption, media_url, permalink } = entry;

  return (
    <motion.figure
      className={clsx("grid gap-2", !isActive && "cursor-pointer")}
      onTap={() => state.setActive(i)}
    >
      <div className="text-center font-mono">(A)</div>
      <figure className="relative h-0 overflow-hidden pb-[100%]">
        <img
          src={media_url}
          width="500"
          height="500"
          className="absolute inset-0 rounded-md"
          alt={caption}
        />
        <AnimatePresence>
          {isActive && (
            <motion.figcaption className="user-select-none absolute inset-x-2 bottom-2">
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "100%" }}
                transition={{ type: "tween" }}
                className="grid gap-2"
              >
                <div className="relative max-h-56 overflow-y-scroll rounded-md bg-white/70 py-3 px-4 text-center font-mono backdrop-blur-lg">
                  {caption}
                </div>
                <a href={permalink} target="_blank" rel="noreferrer norel">
                  <Button href={permalink} size="lg" className="bg-yellow">
                    Se inlägget på Instagram
                  </Button>
                </a>
              </motion.div>
            </motion.figcaption>
          )}
        </AnimatePresence>
      </figure>
    </motion.figure>
  );
};
