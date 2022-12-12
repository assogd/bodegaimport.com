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

  const cardClasses = clsx(
    "card relative z-10 scroll-mt-24 max-w-lg mx-auto",
    variation === "images" && "overflow-hidden",
    className
  );

  const DynamicComponent = dynamic(
    () => import(`./variations/${variation ?? type}`),
    {
      ssr: false,
    }
  );

  return (
    <Animation className={cardClasses} skip={!animate} id={refinedData?.uid}>
      <AspectRatio render={size === "sm"}>
        <DynamicComponent
          data={refinedData}
          size={size}
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
