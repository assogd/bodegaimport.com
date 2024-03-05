import { motion } from "framer-motion";
import extractDomain from "extract-domain";
import Button from "../../Button";
import clsx from "clsx";
import Image from "next/image";

export default function Reseller({ item, size }) {
  const isSm = size === "sm";
  const { reseller, art_no, link, quantity, price, volume } = item;

  const params = [
    quantity,
    volume && `${volume} ml`,
    price && `${price} SEK`,
  ].filter(Boolean);

  return (
    link?.url && (
      <a
        href={link?.url}
        target="_blank"
        rel="noreferrer"
        className={clsx(
          "inset-x-3 bottom-3 font-mono",
          isSm ? "absolute" : "sm:absolute"
        )}
      >
        <motion.div
          className={clsx(
            "mt-2 flex items-center justify-between gap-2 rounded-lg bg-white/60 p-4 backdrop-blur"
          )}
        >
          <div className="leading-5">
            {params.join(" / ")}
            <div className="whitespace-nowrap uppercase">
              <span className="">{extractDomain(link?.url)}</span>
            </div>
          </div>
          <Image
            src={"/icons/launch.svg"}
            alt={"External link"}
            width="16"
            height="16"
            className="h-4 w-4"
          />
        </motion.div>
      </a>
    )
  );
}
