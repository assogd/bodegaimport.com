import { Header } from "./Header";

export const Layout = ({ navigation, settings, children }) => {
  return (
    <div className="text-slate-800">
      <header className="fixed top-8 left-8 text-xl tracking-tight">
        Bodega Import
      </header>
      <main>{children}</main>
      <Header navigation={navigation} settings={settings} />
    </div>
  );
};
