import dynamic from "next/dynamic";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { camelCase } from "../../lib/utils/text";
import { AnimateInView as Animation } from "../Animations/";
import { getCardId } from "../../lib/utils";
import { useRouter } from "next/router";

export default function Card({
  data,
  size,
  animate = true,
  params,
  className,
  i,
  href,
  listProducer,
  aboveFold,
}) {
  const { variation, type } = data;
  const { asPath } = useRouter();

  const isText = variation === "default" || variation === "wine";

  const refinedData = variation === "wine" ? data.primary.reference : data;

  const cardClasses = clsx(
    "card relative scroll-mt-24",
    variation === "images" && "",
    size != "sm" && "min-h-[32em]",
    asPath != "/" && "max-w-lg justify-self-center w-full",
    className
  );

  const DynamicComponent = dynamic(
    () => import(`./variations/${variation ?? type}`),
    {
      ssr: false,
    }
  );

  return (
    <Animation
      className={cardClasses}
      skip={!animate}
      id={refinedData?.uid ?? getCardId(refinedData)}
    >
      <AspectRatio render={size === "sm"}>
        <DynamicComponent
          data={refinedData}
          size={size}
          params={params}
          id={data?.id}
          i={i}
          href={href}
          listProducer={listProducer}
          aboveFold={aboveFold}
        />
      </AspectRatio>
    </Animation>
  );
}

const AspectRatio = ({ render, children }) =>
  render ? (
    <div className="relative h-0 max-w-full overflow-hidden pb-[135%]">
      {children}
    </div>
  ) : (
    children
  );
