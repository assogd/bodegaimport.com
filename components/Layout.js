import Broadcast from "./Broadcast";
import Navigation from "./Navigation/main/";
import Header from "./Header/main/";
import clsx from "clsx";
import Alerts from "./Alerts/";
import useAssoCookie from "../lib/hooks/useAssoCookie";

export const Layout = ({
  navigation,
  marquee,
  settings,
  children,
  disableScroll,
  className = "pt-12 pb-16",
  logotype = { inView: true, alwaysCentered: false },
}) => {
  const [preferences, setPreferences] = useAssoCookie();
  const containerClasses = clsx(
    (disableScroll || !preferences?.consent || !preferences?.consumer) &&
      "overflow-hidden max-h-screen"
  );

  return (
    <div className={containerClasses}>
      <Header settings={logotype} />
      <Navigation links={navigation.data?.links} />
      <main className={className}>{children}</main>
      <Broadcast marquee={marquee} />
      <Alerts />
    </div>
  );
};
