import { PrismicLink, PrismicText, PrismicRichText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import Marquee from "react-fast-marquee";

export const Header = ({ navigation, settings, marquee }) => {
  console.log(marquee);
  return (
    <header className="fixed inset-x-0 bottom-0 z-50">
      <nav className="bg-purple">
        <ul className="flex justify-center gap-4">
          {navigation.data?.links.map((item) => (
            <li
              key={prismicH.asText(item.label)}
              className="p-2 text-slate-800"
            >
              <PrismicLink field={item.link}>
                <PrismicText field={item.label} />
              </PrismicLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="bg-yellow">
        <Marquee pauseOnHover gradient={false}>
          {marquee.data?.messages.map((item, i) => (
            <div key={i} className="py-2 px-4">
              <PrismicRichText field={item.body} />
            </div>
          ))}
        </Marquee>
      </div>
    </header>
  );
};
