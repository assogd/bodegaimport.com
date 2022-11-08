import dynamic from "next/dynamic";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { camelCase } from "../../lib/utils/text";
import { AnimateInView as Animation } from "../Animations/";

export default function Card({
  data,
  size,
  animate = true,
  params,
  className,
}) {
  const { variation, type } = data;

  const isText = variation === "default" || variation === "wine";

  const refinedData = variation === "wine" ? data.primary.reference : data;

  const bgColor = refinedData?.color
    ? `bg-${camelCase(refinedData?.color)}`
    : isText
    ? "bg-white"
    : "bg-transparent";

  const cardClasses = clsx(
    "card relative z-20",
    isText && size != "sm" && "px-6 md:px-8",
    variation === "images" && "overflow-hidden",
    bgColor,
    size === "sm" && " ",
    className
  );

  const DynamicComponent = dynamic(
    () => import(`./variations/${variation ?? type}`),
    {
      ssr: false,
    }
  );

  return (
    <Animation className={cardClasses} skip={!animate}>
      <AspectRatio render={size === "sm"}>
        <DynamicComponent
          data={refinedData}
          size={size}
          bgColor={bgColor}
          params={params}
          id={data?.id}
        />
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
