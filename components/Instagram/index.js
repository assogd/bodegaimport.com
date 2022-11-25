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

  const params = [
    "fields=id,caption,media_type,media_url,permalink,thumbnail_url",
    `access_token=${IGAccessToken}`,
    `limit=10`,
  ];
  const { data, error } = useSWR(
    `https://graph.instagram.com/me/media?${params.join("&")}`,
    fetcher
  );

  console.log({ data, error });

  if (error) return null;

  if (!data) return <div>loading...</div>;

  return (
    <section className="bg-peach mb-[-7.5em] rounded-t-2xl pb-24">
      <header
        className="flex flex-col items-center justify-center gap-2 p-8 text-center sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
        onClick={() => setActive(null)}
      >
        <h2 className="text-lg">Senaste från socialen</h2>
        <Button
          size="xs"
          className="font-mono"
          href={"https://www.instagram.com/bodega.import"}
        >
          Läs allt på @bodegaimport
        </Button>
      </header>
      {data?.data && (
        <Carousel>
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
      <div className="text-center font-mono">
        ({String.fromCharCode(i + 65)})
      </div>
      <figure className="relative h-0 overflow-hidden pb-[100%]">
        <img
          src={media_url}
          width="500"
          height="500"
          className="absolute inset-0"
          alt={caption}
        />
        <AnimatePresence>
          {isActive && (
            <motion.figcaption className="user-select-none absolute inset-2">
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "100%" }}
                transition={{ type: "tween" }}
                className="flex h-full flex-col justify-end gap-1"
              >
                <div className="relative shrink overflow-y-scroll rounded-md bg-white/70 py-3 px-4 text-center font-mono backdrop-blur-lg">
                  {caption}
                </div>
                <Button href={permalink} size="lg" className="bg-yellow">
                  Se inlägget på Instagram
                </Button>
              </motion.div>
            </motion.figcaption>
          )}
        </AnimatePresence>
      </figure>
    </motion.figure>
  );
};
