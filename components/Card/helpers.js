import { compSum } from "../../lib/utils";
import clsx from "clsx";
import { camelCase } from "../../lib/utils/text";

export const WineColor = ({ composition }) => {
  if (!composition) return null;

  const layout = "absolute inset-0 rounded-md";

  const opacity = (x) => (x / compSum(composition)) * 100;

  console.log(compSum);

  return composition.map((color, i) => (
    <div
      key={i}
      className={clsx(
        layout,
        `bg-wine-${camelCase(color.grape.data.title)}/${opacity(color.density)}`
      )}
    />
  ));
};
