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
        yPadding === "sm" && "py-8 md:py-10",
        yPadding === "base" && "py-10 md:py-14",
        yPadding === "lg" && "py-16 md:py-24",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Comp>
  );
};
