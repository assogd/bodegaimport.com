import { motion } from "framer-motion";
import extractDomain from "extract-domain";

export default function Reseller({ item }) {
  console.log(item);
  return null;
  return (
    <motion.div key={i} className="mt-2 grid gap-1 rounded-md bg-white/60 p-4">
      <div className="flex justify-between">
        <div>{item?.reseller ?? "Bodega Import"}</div>
        <div>{item?.volume && `${item.volume} ml`}</div>
      </div>
      <div className="flex justify-between">
        <div>{item?.art_no && `Artikelnr ${item.art_no}`}</div>
        <div>{item?.price && `${item.price} SEK`}</div>
      </div>
      {item.link.url && (
        <Button
          href={item.link.url}
          className="mt-2 w-full bg-red/50 font-serif"
        >
          Beställ från {extractDomain(item.link.url)}
        </Button>
      )}
    </motion.div>
  );
}
