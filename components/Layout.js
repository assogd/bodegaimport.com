import Broadcast from "./Broadcast";
import Navigation from "./Navigation/main/";
import Header from "./Header/main/";
import clsx from "clsx";

export const Layout = ({
  navigation,
  marquee,
  settings,
  children,
  disableScroll,
}) => {
  const containerClasses = clsx(
    disableScroll && "overflow-hidden max-h-screen"
  );

  return (
    <div className={containerClasses}>
      <Header />
      <Navigation links={navigation.data?.links} />
      <main className="pt-12 pb-16 md:pt-4">{children}</main>
      <Broadcast marquee={marquee} />
    </div>
  );
};
