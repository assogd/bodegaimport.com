import { PrismicLink, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { Bounded } from "./Bounded";

export const Header = ({ navigation, settings }) => {
  return (
    <header className="fixed inset-x-0 bottom-0 z-50">
      <nav className="bg-purple">
        <ul className="flex justify-center gap-4">
          {navigation.data?.links.map((item) => (
            <li
              key={prismicH.asText(item.label)}
              className="p-1.5 text-slate-800"
            >
              <PrismicLink field={item.link}>
                <PrismicText field={item.label} />
              </PrismicLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
