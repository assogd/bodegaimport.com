import { createContext, useState } from "react";

export const Context = createContext({
  settings: "",
  settingsHandler: () => {},
});

const ContextProvider = ({ children }) => {
  const [settings, setSettings] = useState("");

  const settingsHandler = (settings) => {
    setSettings(settings);
  };

  return (
    <Context.Provider
      value={{
        settings,
        settingsHandler,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
