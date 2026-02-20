export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20 dark:bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-50 max-h-[90vh] w-[min(640px,92vw)] overflow-hidden ghibli-card animate-soft-pop">
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="h-56 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cream/95 dark:from-dark-cream/95 via-cream/40 dark:via-dark-cream/40 to-transparent" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream/80 dark:bg-dark-cream/80 text-cocoa-dark dark:text-dark-cocoa-dark shadow-soft transition hover:bg-cream dark:hover:bg-dark-cream/90"
            aria-label="Close recipe"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 px-6 pb-6 pt-4">
          <div>
            <p className="ghibli-badge mb-2">{recipe.tag}</p>
            <h2 className="font-display text-3xl text-cocoa-dark dark:text-dark-cocoa-dark">
              {recipe.name}
            </h2>
            <p className="mt-1 text-sm text-cocoa-dark/70 dark:text-dark-cocoa-dark/70">
              {recipe.mood}
            </p>
            <p className="mt-1 text-xs text-cocoa-dark/60 dark:text-dark-cocoa-dark/60">
              Time: {recipe.time} · Serves: {recipe.serves}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-handwritten text-lg text-cocoa-dark dark:text-dark-cocoa-dark">
                Ingredients
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm text-cocoa-dark/80 dark:text-dark-cocoa-dark/80">
                {recipe.ingredients.map((item, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sage dark:bg-dark-sage" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:max-h-[260px] md:overflow-y-auto md:pr-2">
              <h3 className="font-handwritten text-lg text-cocoa-dark dark:text-dark-cocoa-dark">
                Steps
              </h3>
              <ol className="mt-2 space-y-2 text-sm text-cocoa-dark/80 dark:text-dark-cocoa-dark/80">
                {recipe.steps.map((step, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-sage/80 dark:bg-dark-sage/80 text-[11px] font-semibold text-cocoa-dark dark:text-dark-cocoa-dark">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="ghibli-button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
