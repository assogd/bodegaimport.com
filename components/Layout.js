import Broadcast from "./Broadcast";
import Navigation from "./Navigation/main/";
import Header from "./Header/main/";

export const Layout = ({ navigation, marquee, settings, children }) => {
  return (
    <div className="text-slate-800">
      <Header />
      <Navigation links={navigation.data?.links} />
      <main className="pb-16">{children}</main>
      <Broadcast marquee={marquee} />
    </div>
  );
};
