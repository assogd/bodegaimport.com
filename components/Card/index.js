import dynamic from "next/dynamic";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { camelCase } from "../../lib/utils/text";
import { AnimateInView as Animation } from "../Animations/";

export default function Card({ data, size, animate = true }) {
  const { variation } = data;

  const isText = variation === "default" || variation === "wine";

  const bgColor = data?.primary?.reference?.data?.color
    ? `bg-${camelCase(data?.primary?.reference?.data?.color)}`
    : isText
    ? "bg-white"
    : "bg-transparent";

  const cardClasses = clsx(
    "card rounded relative z-20",
    isText && size != "sm" && "px-8 pt-2 pb-8",
    variation === "images" && "overflow-hidden",
    bgColor,
    size === "sm" && "basis-auto shrink-0 snap-center scroll-ml-12 w-96 "
  );

  const DynamicComponent = dynamic(
    () => import(`./variations/${data.variation}`),
    { ssr: false }
  );

  return (
    <Animation className={cardClasses} skip={!animate}>
      <AspectRatio render={size === "sm"}>
        <DynamicComponent data={data} size={size} bgColor={bgColor} />
      </AspectRatio>
    </Animation>
  );
}

const AspectRatio = ({ render, children }) =>
  render ? (
    <div className="relative h-0 overflow-hidden pb-[135%]">{children}</div>
  ) : (
    children
  );
