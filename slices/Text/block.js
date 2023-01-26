import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import Button from "../../components/Button";
import { AnimateInView } from "../../components/Animations";
import clsx from "clsx";

export default function Block({ children, data }) {
  const { button_link, button_text, heading, span_all } = data;

  return (
    <AnimateInView
      className={clsx(
        "grid gap-12 rounded-md bg-white p-4 text-center md:p-8",
        span_all && "col-span-full"
      )}
      amount={0.5}
    >
      <h5>
        <PrismicRichText field={heading} />
      </h5>
      <div className="mx-auto max-w-5xl text-lg lg:text-[2vw]">{children}</div>
      <div>
        <Link href={button_link.url}>
          <a>
            <Button size="md" className="bg-yellow">
              {button_text ?? "Läs mer"}
            </Button>
          </a>
        </Link>
      </div>
    </AnimateInView>
  );
}
