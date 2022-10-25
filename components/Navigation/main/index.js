import { PrismicLink, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import { Collapsible } from "./variants";

export default function Navigation({ links }) {
  const isNarrow = useWindowWidth() < 768;

  const ulClasses = clsx(
    "mx-auto justify-center gap-4 rounded bg-purple/40 hidden md:flex"
  );

  return isNarrow ? (
    <Collapsible links={links} />
  ) : (
    <ul className={ulClasses}>
      {links.map((item) => (
        <li key={prismicH.asText(item.label)} className="whitespace-nowrap p-2">
          <PrismicLink field={item.link}>
            <PrismicText field={item.label} />
          </PrismicLink>
        </li>
      ))}
    </ul>
  );

  return (
    <nav className="bg-purple/80">
      <ul className="flex justify-center gap-4">
        {links.map((item) => (
          <li
            key={prismicH.asText(item.label)}
            className="whitespace-nowrap p-2"
          >
            <PrismicLink field={item.link}>
              <PrismicText field={item.label} />
            </PrismicLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
