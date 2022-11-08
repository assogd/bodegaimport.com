import Image from "next/future/image";
import { PrismicRichText } from "@prismicio/react";
import Button from "../../components/Button";
import Link from "next/link";
import * as prismicH from "@prismicio/helpers";
import clsx from "clsx";

export const Container = ({ children, slice }) => {
  const { button_link, button_text, title } = slice.primary;
  const isButton = button_link.url;

  const className = {
    header: clsx(
      isButton ? "flex items-baseline gap-4 justify-between" : "text-center"
    ),
  };

  return (
    <section className={`cards ${slice.variation} col-span-full`}>
      <header className={className.header}>
        {title && <PrismicRichText field={title} />}
        {isButton && (
          <div>
            <Link href={button_link.url}>
              <a>
                <Button size="sm" className="text-cadmiumGreen border">
                  {button_text ?? "Läs mer"}
                </Button>
              </a>
            </Link>
          </div>
        )}
      </header>
      {children}
    </section>
  );
};
