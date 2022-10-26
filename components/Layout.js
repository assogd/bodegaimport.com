import Broadcast from "./Broadcast";
import Navigation from "./Navigation/main/";

export const Layout = ({ navigation, marquee, settings, children }) => {
  return (
    <div className="text-slate-800">
      <header className="fixed left-[50%] top-8 translate-x-[-50%] text-xl tracking-tight md:left-8">
        Bodega Import
      </header>
      <Navigation links={navigation.data?.links} />
      <main className="pb-16">{children}</main>
      <Broadcast marquee={marquee} />
    </div>
  );
};
