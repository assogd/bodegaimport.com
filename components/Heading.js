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
        "leading-tight tracking-tight",
        size === "xl" && "text-xl md:text-xl",
        size === "lg" && "text-xl md:text-xl",
        size === "md" && "text-lg md:text-lg",
        size === "sm" && "text-xl md:text-xl",
        className
      )}
    >
      {children}
    </Comp>
  );
};
