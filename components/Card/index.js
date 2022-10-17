import dynamic from "next/dynamic";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { camelCase } from "../../lib/utils/text";
import { AnimateInView as Animation } from "../Animations/";

export default function Card({ data, size }) {
  const { variation } = data;

  const isText = variation === "default" || variation === "wine";

  const bgColor = data?.primary?.reference?.data?.color
    ? `bg-${camelCase(data?.primary?.reference?.data?.color)}`
    : isText
    ? "bg-white"
    : "bg-transparent";

  const cardClasses = clsx(
    "card rounded relative z-20",
    isText && "px-8 pt-2 pb-8",
    variation === "images" && "overflow-hidden",
    bgColor,
    size === "sm" && "basis-96"
  );

  const DynamicComponent = dynamic(
    () => import(`./variations/${data.variation}`),
    { ssr: false }
  );

  return (
    <Animation className={cardClasses}>
      <DynamicComponent data={data} size={size} bgColor={bgColor} />
    </Animation>
  );
}
