import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-full bg-white/70 dark:bg-dark-cream/30 px-3 py-2 text-sm font-medium text-cocoa-dark dark:text-dark-cocoa-dark shadow-soft backdrop-blur-sm transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cocoa-dark/50 dark:focus-visible:ring-dark-cocoa/50"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span className="text-base">
        {theme === "dark" ? "☀️" : "🌙"}
      </span>
      <span className="ml-2 hidden sm:inline">
        {theme === "dark" ? "Light" : "Dark"}
      </span>
    </button>
  );
}
