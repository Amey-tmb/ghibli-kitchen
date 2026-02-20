// Default recipes that come with the app
const DEFAULT_RECIPES = [
  {
    id: "pancakes",
    name: "Cloud-Soft Pancakes",
    tag: "Fluffy Japanese Pancakes",
    description: "Tall, wobbly pancakes as soft as morning clouds.",
    image:
      "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
    mood: "Sweet | Cozy brunch | Weekend treat",
    time: "35 mins",
    serves: "2–3 spirits",
    isDefault: true,
    ingredients: [
      "2 large eggs (yolks and whites separated)",
      "2 tbsp milk",
      "1/2 tsp vanilla extract",
      "3 tbsp cake flour (or very soft all-purpose flour)",
      "1/2 tsp baking powder",
      "2 tbsp sugar",
      "1 tsp lemon juice or vinegar",
      "Butter for the pan",
      "Maple syrup, whipped cream, and berries for serving",
    ],
    steps: [
      "In a small bowl, whisk egg yolks, milk, and vanilla until smooth.",
      "Sift in flour and baking powder. Gently whisk just until combined and silky. Do not overmix.",
      "In a clean bowl, beat egg whites with lemon juice. When bubbly, slowly add sugar and continue beating until you get glossy, medium-stiff peaks.",
      "Fold one spoonful of meringue into the yolk batter to loosen it. Then gently fold in the rest using a spatula, keeping as much air as possible.",
      "Preheat a non-stick pan over low heat and lightly butter it. If you have ring molds, grease them and place on the pan.",
      "Spoon the batter into 2–3 tall mounds (or into molds). Add a spoonful more on top once they start to set, stacking them higher.",
      "Cover with a lid and cook on very low heat for 4–5 minutes, until the bottoms are golden and the sides look set.",
      "Very gently flip each pancake using a spatula. Cover again and cook another 3–4 minutes until fully cooked through but still bouncy.",
      "Serve immediately with syrup, whipped cream, and berries. Enjoy the little wobbles before they disappear.",
    ],
  },
  {
    id: "stew",
    name: "Forest Cream Stew",
    tag: "Comforting Cream Stew",
    description: "A gentle, creamy stew perfect for rainy evenings.",
    image:
      "https://images.pexels.com/photos/6287529/pexels-photo-6287529.jpeg?auto=compress&cs=tinysrgb&w=800",
    mood: "Warm | Hearthside dinner | Storytime",
    time: "45 mins",
    serves: "3–4 travelers",
    isDefault: true,
    ingredients: [
      "2 tbsp butter",
      "1 small onion, finely sliced",
      "1 carrot, cut into small moons",
      "2 small potatoes, cut into bite-sized pieces",
      "1 cup broccoli florets (or seasonal green vegetables)",
      "200 g chicken thigh, cut into bite-sized pieces (optional)",
      "2 tbsp all-purpose flour",
      "2 cups milk",
      "1 cup chicken or vegetable stock",
      "1 bay leaf",
      "Salt and white pepper to taste",
      "A splash of cream (optional, for extra coziness)",
    ],
    steps: [
      "In a heavy pot, melt butter over medium-low heat. Add onion and cook slowly until soft and sweet, not browned.",
      "Add carrot, potatoes, and chicken (if using). Stir and cook for 3–4 minutes until the chicken turns opaque.",
      "Sprinkle flour evenly over everything and stir for 1–2 minutes to cook off the raw taste. The mixture will look thick.",
      "Gradually pour in the milk and stock while stirring, making sure there are no lumps.",
      "Add the bay leaf. Bring to a gentle simmer, then lower the heat. Let it softly bubble for about 15–20 minutes, stirring now and then.",
      "Add broccoli and cook for another 5 minutes until all the vegetables are tender and the stew is creamy.",
      "Season carefully with salt and white pepper. Add a splash of cream if you want it extra rich.",
      "Turn off the heat, cover, and let the stew rest for 3–5 minutes so the flavors can settle like mist in a quiet forest.",
      "Serve with warm bread and a quiet moment.",
    ],
  },
  {
    id: "bread",
    name: "Bakery Window Bread",
    tag: "Freshly Baked Milk Bread",
    description: "Soft, slightly sweet bread perfect for butter and jam.",
    image:
      "https://images.pexels.com/photos/4109951/pexels-photo-4109951.jpeg?auto=compress&cs=tinysrgb&w=800",
    mood: "Gentle | Morning sunshine | Shared loaves",
    time: "2 hrs (including rising)",
    serves: "1 loaf",
    isDefault: true,
    ingredients: [
      "2 1/2 cups bread flour (or strong flour)",
      "2 tbsp sugar",
      "1 tsp salt",
      "2 tsp instant yeast",
      "3/4 cup warm milk",
      "2 tbsp soft butter",
      "1 egg (room temperature)",
      "Extra butter for the pan and top",
    ],
    steps: [
      "In a large bowl, mix flour, sugar, salt, and instant yeast.",
      "Add warm milk, egg, and soft butter. Stir until a shaggy dough forms.",
      "Transfer to a lightly floured surface and knead for 8–10 minutes until the dough is smooth and stretchy.",
      "Shape into a ball and place in a lightly oiled bowl. Cover and let rise in a warm, draft-free spot for about 60 minutes, or until doubled.",
      "Gently press out the air. Divide into 3 equal pieces, roll each into a small log, and place side by side in a buttered loaf pan.",
      "Cover and let rise again for 30–40 minutes, until puffy and reaching just above the rim.",
      "Meanwhile, preheat the oven to 180°C / 350°F.",
      "Brush the top with a little milk or beaten egg for a shiny crust.",
      "Bake for 22–25 minutes until golden and fragrant. If it browns too quickly, tent loosely with foil.",
      "While still warm, brush with a bit of butter. Let cool slightly, then slice or tear apart while the steam still carries the smell of a tiny bakery.",
    ],
  },
];

const STORAGE_KEYS = {
  RECIPES: "ghibli-kitchen-recipes",
  THEME: "ghibli-kitchen-theme",
  FONT: "ghibli-kitchen-font",
  COLOR_THEME: "ghibli-kitchen-color-theme",
};

/**
 * Get recipes from localStorage, merging with default recipes
 */
export function getRecipes() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RECIPES);
    if (!stored) {
      return DEFAULT_RECIPES;
    }
    const userRecipes = JSON.parse(stored);
    // Merge default recipes with user-added recipes
    const defaultIds = new Set(DEFAULT_RECIPES.map((r) => r.id));
    const allRecipes = [
      ...DEFAULT_RECIPES,
      ...userRecipes.filter((r) => !defaultIds.has(r.id)),
    ];
    return allRecipes;
  } catch (error) {
    console.error("Error loading recipes:", error);
    return DEFAULT_RECIPES;
  }
}

/**
 * Save recipes to localStorage (only user-added recipes)
 */
export function saveRecipes(recipes) {
  try {
    // Only save user-added recipes (not default ones)
    const userRecipes = recipes.filter((r) => !r.isDefault);
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(userRecipes));
  } catch (error) {
    console.error("Error saving recipes:", error);
    // Handle quota exceeded error gracefully
    if (error.name === "QuotaExceededError") {
      alert(
        "Storage limit reached. Please delete some recipes before adding new ones."
      );
    }
  }
}

/**
 * Get theme preference from localStorage
 */
export function getTheme() {
  try {
    const theme = localStorage.getItem(STORAGE_KEYS.THEME);
    return theme === "dark" ? "dark" : "light";
  } catch (error) {
    console.error("Error loading theme:", error);
    return "light";
  }
}

/**
 * Save theme preference to localStorage
 */
export function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    console.error("Error saving theme:", error);
  }
}

/**
 * Get font preference from localStorage
 */
export function getFont() {
  try {
    const font = localStorage.getItem(STORAGE_KEYS.FONT);
    return font || "display"; // default to display font
  } catch (error) {
    console.error("Error loading font:", error);
    return "display";
  }
}

/**
 * Save font preference to localStorage
 */
export function saveFont(font) {
  try {
    localStorage.setItem(STORAGE_KEYS.FONT, font);
  } catch (error) {
    console.error("Error saving font:", error);
  }
}

/**
 * Get color theme preference from localStorage
 */
export function getColorTheme() {
  try {
    const colorTheme = localStorage.getItem(STORAGE_KEYS.COLOR_THEME);
    return colorTheme || "ghibli"; // default to ghibli theme
  } catch (error) {
    console.error("Error loading color theme:", error);
    return "ghibli";
  }
}

/**
 * Save color theme preference to localStorage
 */
export function saveColorTheme(colorTheme) {
  try {
    localStorage.setItem(STORAGE_KEYS.COLOR_THEME, colorTheme);
  } catch (error) {
    console.error("Error saving color theme:", error);
  }
}
