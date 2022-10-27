import Broadcast from "./Broadcast";
import Navigation from "./Navigation/main/";
import Header from "./Header/main/";

export const Layout = ({ navigation, marquee, settings, children }) => {
  return (
    <div className="text-slate-800">
      <Header />
      <Navigation links={navigation.data?.links} />
      <main className="pt-12 pb-16 md:pt-4">{children}</main>
      <Broadcast marquee={marquee} />
    </div>
  );
};
