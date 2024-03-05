import { PrismicLink, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import dynamic from "next/dynamic";
const Collapsible = dynamic(() => import("./variants"), {
  ssr: false,
});
export default function Navigation({ links, marquee }) {
  const onlyWidth = useWindowWidth();
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => setWindowWidth(onlyWidth), [onlyWidth]);

  const itemsToShow = Math.round((windowWidth - 100) / 100);

  return (
    <Collapsible links={links} marquee={marquee} itemsToShow={itemsToShow} />
  );
}
