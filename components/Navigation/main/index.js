import { PrismicLink, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import { Collapsible } from "./variants";

export default function Navigation({ links }) {
  const onlyWidth = useWindowWidth();
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => setWindowWidth(onlyWidth), [onlyWidth]);

  const itemMultiplicator = Math.round((windowWidth - 350) / 80 + 3);
  const itemsToShow = itemMultiplicator;

  const ulClasses = clsx(
    "mx-auto justify-center gap-4 rounded-md bg-purple/40 hidden sm:flex"
  );

  return <Collapsible links={links} itemsToShow={itemsToShow} />;
}
