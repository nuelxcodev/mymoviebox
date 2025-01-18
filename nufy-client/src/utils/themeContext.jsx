import { createContext, useState, useEffect } from "react";

export const Theme_context = createContext("light");

export default function Themeprovider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  useEffect(() => {
    document.documentElement.classList.remove(
      theme === "light" ? "dark" : "light"
    );
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Theme_context.Provider value={{ theme, setTheme }}>
      {children}
    </Theme_context.Provider>
  );
}
