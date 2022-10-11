import { PrismicLink, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { Bounded } from "./Bounded";

export const Header = ({ navigation, settings }) => {
  return (
    <header className="fixed inset-x-0 bottom-0">
      <nav className="bg-purple">
        <ul className="flex justify-center gap-4">
          {navigation.data?.links.map((item) => (
            <li
              key={prismicH.asText(item.label)}
              className="p-1.5 tracking-tight text-slate-800"
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

  return (
    <Bounded as="header" yPadding="sm">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 leading-none">
        <PrismicLink
          href="/"
          className="hidden text-xl font-semibold tracking-tight"
        >
          <PrismicText field={settings.data.siteTitle} />
        </PrismicLink>
        <nav>
          <ul className="flex flex-wrap gap-6 md:gap-10">
            {navigation.data?.links.map((item) => (
              <li
                key={prismicH.asText(item.label)}
                className="font-semibold tracking-tight text-slate-800"
              >
                <PrismicLink field={item.link}>
                  <PrismicText field={item.label} />
                </PrismicLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Bounded>
  );
};
