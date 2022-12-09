import { compSum } from "../../lib/utils";
import clsx from "clsx";
import { camelCase } from "../../lib/utils/text";

export const WineColor = ({ composition }) => {
  if (!composition) return null;

  const layout = "absolute inset-0 rounded-md";

  const opacity = (x) =>
    Math.round(((x / compSum(composition)) * 100) / 10) * 10;
  const opacityFixed = (x) => (x / compSum(composition)).toFixed(2);

  return (
    <>
      <div className={clsx(layout, `bg-white`)} />
      {composition.map((color, i) => (
        <div
          key={i}
          className={clsx(
            layout,
            `bg-wine-${camelCase(color.grape.data.title)}/${opacity(
              color.density
            )}`
          )}
        />
      ))}
    </>
  );
};
