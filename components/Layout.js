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
}) => {
  const [preferences, setPreferences] = useAssoCookie();
  const containerClasses = clsx(
    (disableScroll || !preferences?.consent || !preferences?.consumer) &&
      "overflow-hidden max-h-screen"
  );

  return (
    <div className={containerClasses}>
      <Header />
      <Navigation links={navigation.data?.links} />
      <main className="pt-12 pb-16 md:pt-4">{children}</main>
      <Broadcast marquee={marquee} />
      <Alerts />
    </div>
  );
};
