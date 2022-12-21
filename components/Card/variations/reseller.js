import { motion } from "framer-motion";
import extractDomain from "extract-domain";
import Button from "../../Button";
import clsx from "clsx";

const Container = ({ children, className, href }) => (
  <motion.div
    className={clsx("mx-[-.5em] mt-2 grid gap-1 rounded-md bg-white/60 p-4")}
  >
    {children}
    {href && (
      <Button href={href} className="mt-1 w-full bg-red/50 font-serif">
        Beställ från {extractDomain(href)}
      </Button>
    )}
  </motion.div>
);

export default function Reseller({ item }) {
  const { reseller, art_no, link, quantity, price, volume } = item;

  const onlyPrice = price && !reseller && !art_no && !volume;

  const priceAndQuantity = price && !reseller && !art_no && volume;
  const priceAndReseller = price && reseller && !art_no && !volume;

  const resellerAndQuantityAndPrice = price && reseller && !art_no && volume;
  const artNoAndQuantityAndPrice = price && !reseller && art_no && volume;

  const complete = price && reseller && art_no && volume;

  if (onlyPrice)
    return (
      <Container href={link.url}>
        <div className="flex justify-between">
          <div>(Styckpris)</div>
          <div>{price} SEK</div>
        </div>
      </Container>
    );

  if (priceAndQuantity)
    return (
      <Container href={link.url}>
        <div className="flex justify-between">
          <div>
            {quantity && `${quantity} x `}
            {volume && `${volume} ml`}
          </div>
          <div>{price} SEK</div>
        </div>
      </Container>
    );

  if (priceAndReseller)
    return (
      <Container className="flex justify-between" href={link.url}>
        <div className="flex justify-between">
          <div>{reseller}</div>
          <div>{price} SEK</div>
        </div>
      </Container>
    );

  if (resellerAndQuantityAndPrice)
    return (
      <Container href={link.url}>
        <div>{reseller}</div>
        <div className="flex justify-between">
          <div>
            {quantity && `${quantity} x `}
            {volume && `${volume} ml`}
          </div>
          <div>{price} SEK</div>
        </div>
      </Container>
    );

  if (artNoAndQuantityAndPrice)
    return (
      <Container href={link.url}>
        <div>Artikelnr {art_no}</div>
        <div className="flex justify-between">
          <div>
            {quantity && `${quantity} x `}
            {volume && `${volume} ml`}
          </div>
          <div>{price} SEK</div>
        </div>
      </Container>
    );

  if (complete)
    return (
      <Container href={link.url}>
        <div className="flex justify-between">
          <div>{reseller}</div>
          <div>
            {quantity && `${quantity} x `}
            {volume && `${volume} ml`}
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <div>Artikelnr {art_no}</div>
          </div>
          <div>{price} SEK</div>
        </div>
      </Container>
    );

  console.log(item);
  return null;
}
