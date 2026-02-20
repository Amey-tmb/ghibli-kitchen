import { useTheme } from "../hooks/useTheme";

const FONT_OPTIONS = [
  {
    id: "display",
    name: "DM Serif Display",
    description: "Elegant serif",
    className: "font-display",
  },
  {
    id: "handwritten",
    name: "Courgette",
    description: "Handwritten style",
    className: "font-handwritten",
  },
  {
    id: "inter",
    name: "Inter",
    description: "Modern sans-serif",
    className: "font-sans",
  },
  {
    id: "playfair",
    name: "Playfair Display",
    description: "Classic serif",
    className: "font-serif",
  },
];

const COLOR_THEMES = [
  {
    id: "ghibli",
    name: "Ghibli",
    description: "Cream, sage, cocoa",
    colors: {
      light: { cream: "#fdf5e6", sage: "#c9d8c5", cocoa: "#b08968" },
      dark: { cream: "#1a1a1a", sage: "#4a5d4a", cocoa: "#d4a574" },
    },
  },
  {
    id: "lavender",
    name: "Lavender Dreams",
    description: "Soft purple tones",
    colors: {
      light: { cream: "#f5f0ff", sage: "#e8d5ff", cocoa: "#b794d4" },
      dark: { cream: "#1a1620", sage: "#3d2f4d", cocoa: "#c9a8e8" },
    },
  },
  {
    id: "ocean",
    name: "Ocean Breeze",
    description: "Cool blue greens",
    colors: {
      light: { cream: "#e6f5f5", sage: "#b8e0d8", cocoa: "#5fa8a3" },
      dark: { cream: "#1a2323", sage: "#2d4a47", cocoa: "#7dd3cc" },
    },
  },
  {
    id: "sunset",
    name: "Sunset Glow",
    description: "Warm oranges",
    colors: {
      light: { cream: "#fff5e6", sage: "#ffd9b3", cocoa: "#ff8c42" },
      dark: { cream: "#1a1610", sage: "#4a3d2d", cocoa: "#ffa366" },
    },
  },
];

export default function Settings({ isOpen, onClose }) {
  const {
    theme,
    toggleTheme,
    font,
    setFont,
    colorTheme,
    setColorTheme,
  } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 dark:bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-50 max-h-[90vh] w-[min(600px,92vw)] overflow-y-auto ghibli-card animate-soft-pop">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-sage/30 dark:border-dark-sage/30 bg-[#fffaf3]/90 dark:bg-[#2d2d2d]/90 backdrop-blur-md px-6 py-4">
          <h2 className="font-display text-2xl text-cocoa-dark dark:text-dark-cocoa-dark">
            ⚙️ Settings
          </h2>
          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-cocoa-dark dark:text-dark-cocoa-dark hover:bg-sage/20 dark:hover:bg-dark-sage/20 transition"
            aria-label="Close settings"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Theme Toggle */}
          <div>
            <h3 className="font-handwritten text-lg text-cocoa-dark dark:text-dark-cocoa-dark mb-4">
              Appearance
            </h3>
            <div className="flex items-center justify-between p-4 rounded-xl bg-sage/10 dark:bg-dark-sage/10 border border-sage/30 dark:border-dark-sage/30">
              <div>
                <p className="text-sm font-medium text-cocoa-dark dark:text-dark-cocoa-dark">
                  {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </p>
                <p className="text-xs text-cocoa-dark/60 dark:text-dark-cocoa-dark/60 mt-1">
                  {theme === "dark"
                    ? "Easier on the eyes at night"
                    : "Bright and cheerful"}
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  theme === "dark"
                    ? "bg-cocoa dark:bg-dark-cocoa"
                    : "bg-sage dark:bg-dark-sage"
                }`}
                aria-label="Toggle theme"
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-cream dark:bg-dark-cream transition-transform ${
                    theme === "dark" ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Font Selection */}
          <div>
            <h3 className="font-handwritten text-lg text-cocoa-dark dark:text-dark-cocoa-dark mb-4">
              Font Style
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {FONT_OPTIONS.map((fontOption) => (
                <button
                  key={fontOption.id}
                  onClick={() => setFont(fontOption.id)}
                  className={`p-4 rounded-xl border-2 transition text-left ${
                    font === fontOption.id
                      ? "border-cocoa dark:border-dark-cocoa bg-cocoa/10 dark:bg-dark-cocoa/10"
                      : "border-sage/30 dark:border-dark-sage/30 hover:border-sage dark:hover:border-dark-sage bg-sage/5 dark:bg-dark-sage/5"
                  }`}
                >
                  <p
                    className={`text-lg font-medium mb-1 ${fontOption.className} text-cocoa-dark dark:text-dark-cocoa-dark`}
                  >
                    {fontOption.name}
                  </p>
                  <p className="text-xs text-cocoa-dark/60 dark:text-dark-cocoa-dark/60">
                    {fontOption.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Color Theme Selection */}
          <div>
            <h3 className="font-handwritten text-lg text-cocoa-dark dark:text-dark-cocoa-dark mb-4">
              Color Theme
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {COLOR_THEMES.map((themeOption) => (
                <button
                  key={themeOption.id}
                  onClick={() => setColorTheme(themeOption.id)}
                  className={`p-4 rounded-xl border-2 transition text-left ${
                    colorTheme === themeOption.id
                      ? "border-cocoa dark:border-dark-cocoa bg-cocoa/10 dark:bg-dark-cocoa/10"
                      : "border-sage/30 dark:border-dark-sage/30 hover:border-sage dark:hover:border-dark-sage bg-sage/5 dark:bg-dark-sage/5"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-1">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor:
                            theme === "dark"
                              ? themeOption.colors.dark.cream
                              : themeOption.colors.light.cream,
                        }}
                      />
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor:
                            theme === "dark"
                              ? themeOption.colors.dark.sage
                              : themeOption.colors.light.sage,
                        }}
                      />
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor:
                            theme === "dark"
                              ? themeOption.colors.dark.cocoa
                              : themeOption.colors.light.cocoa,
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-cocoa-dark dark:text-dark-cocoa-dark mb-1">
                    {themeOption.name}
                  </p>
                  <p className="text-xs text-cocoa-dark/60 dark:text-dark-cocoa-dark/60">
                    {themeOption.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end p-6 pt-4 border-t border-sage/30 dark:border-dark-sage/30">
          <button onClick={onClose} className="ghibli-button">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
