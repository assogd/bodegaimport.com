import clsx from "clsx";
import Link from "next/link";

export const Container = ({ children, size, className }) => (
  <div
    className={clsx(
      "hyphens",
      size != "sm" && "relative min-h-full p-8 pb-10",
      size === "sm" && "absolute inset-0 p-6 pb-8",
      className
    )}
  >
    {children}
  </div>
);

export const Header = ({ children }) => (
  <header
    className={clsx(
      "relative mb-2 font-serif text-base",
      "flex items-stretch justify-between gap-2",
      "border-b border-dashed"
    )}
  >
    {children}
  </header>
);

export const Gradient = () => {
  return (
    <div className="absolute inset-x-0 bottom-0 ">
      <div className="h-12 rounded-md bg-gradient-to-t from-white" />
      <div className="h-4 bg-white" />
    </div>
  );
};

export const Open = ({ href }) => (
  <div className="whitespace-nowrap font-mono">
    <Link href={href}>Öppna -&gt;</Link>
  </div>
);
