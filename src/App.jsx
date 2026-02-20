import React, { useState, useEffect } from "react";
import { getRecipes, saveRecipes } from "./utils/storage";
import { useTheme } from "./hooks/useTheme";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
import RecipeForm from "./components/RecipeForm";
import AddRecipeButton from "./components/AddRecipeButton";
import Settings from "./components/Settings";
import SettingsButton from "./components/SettingsButton";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [formRecipe, setFormRecipe] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { theme } = useTheme();

  // Load recipes from localStorage on mount
  useEffect(() => {
    const loadedRecipes = getRecipes();
    setRecipes(loadedRecipes);
  }, []);

  // Save recipes to localStorage whenever recipes change
  useEffect(() => {
    if (recipes.length > 0) {
      saveRecipes(recipes);
    }
  }, [recipes]);

  const addRecipe = (recipeData) => {
    const newRecipe = {
      ...recipeData,
      id: crypto.randomUUID(),
      isDefault: false,
    };
    setRecipes([...recipes, newRecipe]);
    setFormRecipe(null);
  };

  const updateRecipe = (recipeData) => {
    setRecipes(
      recipes.map((r) => (r.id === recipeData.id ? recipeData : r))
    );
    setFormRecipe(null);
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((r) => r.id !== id));
    if (selectedRecipe?.id === id) {
      setSelectedRecipe(null);
    }
  };

  const handleFormSave = (recipeData) => {
    if (formRecipe) {
      updateRecipe(recipeData);
    } else {
      addRecipe(recipeData);
    }
    setShowForm(false);
    setFormRecipe(null);
  };

  const handleAddClick = () => {
    setFormRecipe(null);
    setSelectedRecipe(null);
    setShowForm(true);
  };

  const handleEditClick = (recipe) => {
    setFormRecipe(recipe);
    setSelectedRecipe(null);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setFormRecipe(null);
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <main className="mx-auto max-w-5xl space-y-8">
        <header className="flex flex-col items-center text-center animate-fade-in-up-delayed relative">
          <div className="absolute top-0 right-0">
            <SettingsButton onClick={() => setShowSettings(true)} />
          </div>
          <div className="inline-flex items-center gap-3 rounded-full bg-white/70 dark:bg-dark-cream/30 px-4 py-2 text-xs font-medium text-cocoa-dark/80 dark:text-dark-cocoa-dark/80 shadow-soft backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-sage dark:bg-dark-sage animate-pulse" />
            <span>Warm, cozy recipes from a gentle world</span>
          </div>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl text-cocoa-dark dark:text-dark-cocoa-dark drop-shadow-sm">
            Ghibli Kitchen
          </h1>
          <p className="mt-2 max-w-xl text-sm sm:text-base text-cocoa-dark/80 dark:text-dark-cocoa-dark/80">
            Cozy recipes from a magical world — soft breads, creamy stews, and
            cloud-like pancakes to share with wandering spirits and sleepy
            friends.
          </p>
        </header>

        <section className="animate-fade-in-up-delayed">
          <div className="mb-4 flex items-center justify-between text-xs text-cocoa-dark/70 dark:text-dark-cocoa-dark/70">
            <span>{recipes.length} enchanted recipes</span>
            <span className="hidden sm:inline">
              Tip: Click &quot;View Recipe&quot; to see ingredients and steps.
            </span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onOpen={setSelectedRecipe}
                onEdit={handleEditClick}
                onDelete={deleteRecipe}
              />
            ))}
          </div>
        </section>
      </main>

      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />

      {showForm && (
        <RecipeForm
          recipe={formRecipe}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      )}

      <AddRecipeButton onClick={handleAddClick} />

      <Settings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}
