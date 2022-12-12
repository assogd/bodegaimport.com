import clsx from "clsx";

export const Heading = ({
  as: Comp = "h1",
  size = "lg",
  children,
  className,
}) => {
  return (
    <Comp
      className={clsx(
        "inline-block leading-tight tracking-tight",
        size === "xl" && "text-xl sm:text-xl",
        size === "lg" && "text-xl sm:text-xl",
        size === "md" && "text-lg sm:text-lg",
        size === "sm" && "text-xl sm:text-xl",
        className
      )}
    >
      {children}
    </Comp>
  );
};
