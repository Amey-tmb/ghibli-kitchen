export default function AddRecipeButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-30 inline-flex items-center justify-center h-14 w-14 rounded-full bg-cocoa dark:bg-dark-cocoa text-cream dark:text-dark-cream shadow-soft transition-all hover:scale-110 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cocoa-dark/70 dark:focus-visible:ring-dark-cocoa/70 animate-fade-in-up"
      aria-label="Add new recipe"
      title="Add new recipe"
    >
      <span className="text-2xl">+</span>
    </button>
  );
}
