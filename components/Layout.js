import Broadcast from "./Broadcast";
import Navigation from "./Navigation/main/";
import Header from "./Header/main/";
import clsx from "clsx";
import Alerts from "./Alerts/";
import useAssoCookie from "../lib/hooks/useAssoCookie";
import Footer from "./Footer";
import { useState, useEffect } from "react";

export const Layout = ({
  navigation,
  marquee,
  settings,
  children,
  disableScroll,
  className = "pt-12",
  logotype = { inView: true, alwaysCentered: false },
  bg,
}) => {
  const [preferences, setPreferences] = useAssoCookie();
  const [scrollStateDisabled, setScrollState] = useState(false);

  useEffect(
    () => setScrollState(!preferences?.consent || !preferences?.consumer),
    [preferences]
  );

  const containerClasses = clsx(
    (disableScroll || scrollStateDisabled) &&
      "overflow-hidden max-h-screen fixed inset-0",
    bg
  );

  return (
    <>
      <div className={"containerClasses"}>
        <Header settings={logotype} />
        <main className={clsx(className)}>
          {children}
          <Navigation links={navigation.data?.links} />
          <Broadcast marquee={marquee} />
        </main>
        <Alerts />
        <Footer />
      </div>
    </>
  );
};
