export default function RecipeCard({ recipe, onOpen, onEdit, onDelete }) {
  const isUserAdded = !recipe.isDefault;

  const handleDelete = (e) => {
    e.stopPropagation();
    if (
      window.confirm(
        `Are you sure you want to delete "${recipe.name}"? This cannot be undone.`
      )
    ) {
      onDelete(recipe.id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(recipe);
  };

  return (
    <article
      className="ghibli-card flex flex-col overflow-hidden animate-fade-in-up group"
      style={{ animationDelay: `${Math.random() * 120}ms` }}
    >
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="h-48 w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream/80 dark:from-dark-cream/80 via-cream/30 dark:via-dark-cream/30 to-transparent" />
        {isUserAdded && (
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={handleEdit}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-dark-cream/90 text-cocoa-dark dark:text-dark-cocoa-dark shadow-soft backdrop-blur-sm transition hover:scale-110 hover:bg-white dark:hover:bg-dark-cream"
              aria-label="Edit recipe"
              title="Edit recipe"
            >
              ✏️
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-dark-cream/90 text-red-600 dark:text-red-400 shadow-soft backdrop-blur-sm transition hover:scale-110 hover:bg-white dark:hover:bg-dark-cream"
              aria-label="Delete recipe"
              title="Delete recipe"
            >
              🗑️
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <div className="flex items-start justify-between gap-2">
          <p className="ghibli-badge w-fit">{recipe.tag}</p>
          {isUserAdded && (
            <span className="text-xs text-cocoa-dark/60 dark:text-dark-cocoa-dark/60 italic">
              Your recipe
            </span>
          )}
        </div>
        <h3 className="mt-2 font-display text-xl text-cocoa-dark dark:text-dark-cocoa-dark">
          {recipe.name}
        </h3>
        <p className="mt-1 text-sm text-cocoa-dark/70 dark:text-dark-cocoa-dark/70">
          {recipe.description}
        </p>
        <p className="mt-2 text-xs text-cocoa-dark/60 dark:text-dark-cocoa-dark/60">
          Time: {recipe.time} · Serves: {recipe.serves}
        </p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <span className="text-xs italic text-cocoa-dark/60 dark:text-dark-cocoa-dark/60">
            Feels like: {recipe.mood}
          </span>
          <button
            className="ghibli-button"
            onClick={() => onOpen(recipe)}
          >
            View Recipe
          </button>
        </div>
      </div>
    </article>
  );
}
