import { motion } from "framer-motion";
import extractDomain from "extract-domain";
import Button from "../../Button";
import clsx from "clsx";

const Container = ({ children, className }) => (
  <motion.div
    className={clsx(
      "mx-[-.5em] mt-2 flex gap-1 rounded-md bg-white/60 p-4",
      className
    )}
  >
    {children}
  </motion.div>
);

export default function Reseller({ item }) {
  const { reseller, art_no, link, quantity, price, volume } = item;

  const onlyPrice = price && !reseller && !art_no && !volume;
  const priceAndQuantity = price && !reseller && !art_no && volume;

  if (onlyPrice)
    return (
      <Container className="justify-between">
        <div>(Styckpris)</div>
        <div>{price} SEK</div>
      </Container>
    );

  if (priceAndQuantity)
    return (
      <Container className="justify-between">
        <div>(Styckpris)</div>
        <div>{price} SEK</div>
      </Container>
    );

  return (
    <motion.div className="mx-[-.5em] mt-2 grid gap-1 rounded-md bg-white/60 p-4">
      <div className="flex justify-between">
        <div>{reseller ?? "Bodega Import"}</div>
        <div>{art_no && `Artikelnr ${art_no}`}</div>
      </div>
      <div className="flex justify-between">
        <div>
          {quantity && `${quantity} x `}
          {volume && `${volume} ml`}
        </div>
        <div>{price && `${price} SEK`}</div>
      </div>
      {link.url && (
        <Button href={link.url} className="mt-2 w-full bg-red/50 font-serif">
          Beställ från {extractDomain(link.url)}
        </Button>
      )}
    </motion.div>
  );
}
