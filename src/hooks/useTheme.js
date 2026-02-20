import { useState, useEffect } from "react";
import {
  getTheme,
  saveTheme,
  getFont,
  saveFont,
  getColorTheme,
  saveColorTheme,
} from "../utils/storage";

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== "undefined") {
      return getTheme();
    }
    return "light";
  });

  const [font, setFontState] = useState(() => {
    if (typeof window !== "undefined") {
      return getFont();
    }
    return "display";
  });

  const [colorTheme, setColorThemeState] = useState(() => {
    if (typeof window !== "undefined") {
      return getColorTheme();
    }
    return "ghibli";
  });

  useEffect(() => {
    // Apply theme class to document root
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    // Apply font class to document root
    const root = document.documentElement;
    root.setAttribute("data-font", font);
    saveFont(font);
  }, [font]);

  useEffect(() => {
    // Apply color theme class to document root
    const root = document.documentElement;
    root.setAttribute("data-color-theme", colorTheme);
    saveColorTheme(colorTheme);
  }, [colorTheme]);

  // Initialize on mount - apply all preferences immediately
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-font", font);
    root.setAttribute("data-color-theme", colorTheme);
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setTheme = (newTheme) => {
    if (newTheme === "dark" || newTheme === "light") {
      setThemeState(newTheme);
    }
  };

  const setFontPreference = (newFont) => {
    setFontState(newFont);
  };

  const setColorThemePreference = (newColorTheme) => {
    setColorThemeState(newColorTheme);
  };

  return {
    theme,
    toggleTheme,
    setTheme,
    font,
    setFont: setFontPreference,
    colorTheme,
    setColorTheme: setColorThemePreference,
  };
}
