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

export const Li = ({ children }) => (
  <li className="border-b border-dashed py-2 first:pt-0 last:border-0">
    {children}
  </li>
);

export const Heading = ({ children }) => (
  <h5 className="text-monoBase leading-relaxed">{children}</h5>
);

export const Body = ({ children }) => (
  <div className={clsx("font-mono text-monoBase")}>{children}</div>
);
