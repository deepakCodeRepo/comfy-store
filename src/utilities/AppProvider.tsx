import { createContext, useContext } from "react";
import { useState } from "react";

export type AppContextType = {
  menuBtn: boolean;
  setMenuBtn: React.Dispatch<React.SetStateAction<boolean>>;
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [menuBtn, setMenuBtn] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <AppContext.Provider
      value={{ menuBtn, setMenuBtn, darkTheme, setDarkTheme }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("useAppContext must be used within the AppProvider");
  return context;
};
