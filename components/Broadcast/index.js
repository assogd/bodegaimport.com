import { PrismicRichText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

export const Broadcast = ({ navigation, settings, marquee }) => {
  console.log(marquee.data.messages);
  return (
    <motion.div className="sticky inset-x-0 bottom-0 z-20 bg-yellow/100">
      <Marquee pauseOnHover gradient={false}>
        {marquee.data?.messages.map((item, i) => (
          <div key={i} className="py-3 px-4">
            <PrismicRichText field={item.body} />
          </div>
        ))}
      </Marquee>
    </motion.div>
  );
};

export default Broadcast;
