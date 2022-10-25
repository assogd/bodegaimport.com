import Broadcast from "./Broadcast";
import Navigation from "./Navigation/main/";

export const Layout = ({ navigation, marquee, settings, children }) => {
  return (
    <div className="text-slate-800">
      <header className="fixed top-8 left-8 text-xl tracking-tight">
        Bodega Import
      </header>
      <Navigation links={navigation.data?.links} />
      <main className="pb-16">{children}</main>
      <Broadcast marquee={marquee} />
    </div>
  );
};
