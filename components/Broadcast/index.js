import { PrismicRichText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

export const Broadcast = ({ navigation, settings, marquee }) => {
  if (marquee?.data.messages.length == 0) return null;

  console.log(marquee.data.messages);

  const multipliedMarquee = [...Array(5)]
    .map((m) => marquee.data.messages.map((a) => a))
    .flat(1);

  return (
    <motion.div className="sticky inset-x-0 bottom-0 z-20 bg-yellow/100">
      <Marquee pauseOnHover gradient={false}>
        {multipliedMarquee.map((item, i) => (
          <div key={i} className="py-3 px-4">
            <PrismicRichText field={item.body} />
          </div>
        ))}
      </Marquee>
    </motion.div>
  );
};

export default Broadcast;
