export default function SettingsButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-full bg-white/70 dark:bg-dark-cream/30 px-3 py-2 text-sm font-medium text-cocoa-dark dark:text-dark-cocoa-dark shadow-soft backdrop-blur-sm transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cocoa-dark/50 dark:focus-visible:ring-dark-cocoa/50"
      aria-label="Open settings"
      title="Settings"
    >
      <span className="text-lg">⚙️</span>
    </button>
  );
}
