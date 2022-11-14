import clsx from "clsx";

export const Bounded = ({
  as: Comp = "div",
  yPadding = "base",
  collapsible = true,
  className,
  children,
}) => {
  return (
    <Comp
      data-collapsible={collapsible}
      className={clsx(
        "px-6",
        yPadding === "sm" && "py-8 sm:py-10",
        yPadding === "base" && "py-10 sm:py-14",
        yPadding === "lg" && "py-16 sm:py-24",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Comp>
  );
};
