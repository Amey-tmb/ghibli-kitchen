import { useState, useEffect } from "react";

export default function RecipeForm({ recipe, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    tag: "",
    description: "",
    image: "",
    mood: "",
    time: "",
    serves: "",
    ingredients: [""],
    steps: [""],
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [imageSource, setImageSource] = useState("url"); // "url" or "upload"
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name || "",
        tag: recipe.tag || "",
        description: recipe.description || "",
        image: recipe.image || "",
        mood: recipe.mood || "",
        time: recipe.time || "",
        serves: recipe.serves || "",
        ingredients: recipe.ingredients?.length
          ? recipe.ingredients
          : [""],
        steps: recipe.steps?.length ? recipe.steps : [""],
      });
      // Check if image is a data URL (uploaded) or URL
      if (recipe.image?.startsWith("data:")) {
        setImageSource("upload");
        setImagePreview(recipe.image);
      } else if (recipe.image) {
        setImageSource("url");
        setImagePreview(recipe.image);
      }
    } else {
      setImagePreview(null);
      setImageSource("url");
    }
  }, [recipe]);

  const processImageFile = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrors({ ...errors, image: "Please select an image file" });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({
        ...errors,
        image: "Image size must be less than 5MB",
      });
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setFormData({ ...formData, image: base64String });
      setImagePreview(base64String);
      setErrors({ ...errors, image: "" });
    };
    reader.onerror = () => {
      setErrors({ ...errors, image: "Failed to read image file" });
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    processImageFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processImageFile(file);
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData({ ...formData, image: url });
    if (url.trim()) {
      setImagePreview(url);
      setErrors({ ...errors, image: "" });
    } else {
      setImagePreview(null);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.tag.trim()) newErrors.tag = "Tag is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.image.trim())
      newErrors.image = "Image is required (upload a file or provide URL)";
    if (!formData.time.trim()) newErrors.time = "Time is required";
    if (!formData.serves.trim()) newErrors.serves = "Serves is required";
    if (
      formData.ingredients.length === 0 ||
      formData.ingredients.every((i) => !i.trim())
    ) {
      newErrors.ingredients = "At least one ingredient is required";
    }
    if (
      formData.steps.length === 0 ||
      formData.steps.every((s) => !s.trim())
    ) {
      newErrors.steps = "At least one step is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const recipeData = {
      ...formData,
      ingredients: formData.ingredients.filter((i) => i.trim()),
      steps: formData.steps.filter((s) => s.trim()),
    };

    if (recipe) {
      recipeData.id = recipe.id;
    }

    onSave(recipeData);
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ""],
    });
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      setFormData({
        ...formData,
        ingredients: formData.ingredients.filter((_, i) => i !== index),
      });
    }
  };

  const updateIngredient = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, ""],
    });
  };

  const removeStep = (index) => {
    if (formData.steps.length > 1) {
      setFormData({
        ...formData,
        steps: formData.steps.filter((_, i) => i !== index),
      });
    }
  };

  const updateStep = (index, value) => {
    const newSteps = [...formData.steps];
    newSteps[index] = value;
    setFormData({ ...formData, steps: newSteps });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20 dark:bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onCancel} aria-hidden="true" />

      <div className="relative z-50 max-h-[90vh] w-[min(720px,92vw)] overflow-y-auto ghibli-card animate-soft-pop">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-sage/30 dark:border-dark-sage/30 bg-[#fffaf3]/90 dark:bg-[#2d2d2d]/90 backdrop-blur-md px-6 py-4">
          <h2 className="font-display text-2xl text-cocoa-dark dark:text-dark-cocoa-dark">
            {recipe ? "Edit Recipe" : "Add New Recipe"}
          </h2>
          <button
            onClick={onCancel}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-cocoa-dark dark:text-dark-cocoa-dark hover:bg-sage/20 dark:hover:bg-dark-sage/20 transition"
            aria-label="Close form"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-cocoa-dark dark:text-dark-cocoa-dark mb-1">
              Recipe Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="ghibli-input"
              placeholder="e.g., Cloud-Soft Pancakes"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-cocoa-dark dark:text-dark-cocoa-dark mb-1">
              Tag *
            </label>
            <input
              type="text"
              value={formData.tag}
              onChange={(e) =>
                setFormData({ ...formData, tag: e.target.value })
              }
              className="ghibli-input"
              placeholder="e.g., Fluffy Japanese Pancakes"
            />
            {errors.tag && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {errors.tag}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-cocoa-dark dark:text-dark-cocoa-dark mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="ghibli-textarea"
              placeholder="A short, cozy description..."
              rows="2"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {errors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-cocoa-dark dark:text-dark-cocoa-dark mb-1">
                Time *
              </label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="ghibli-input"
                placeholder="e.g., 35 mins"
              />
              {errors.time && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.time}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-cocoa-dark dark:text-dark-cocoa-dark mb-1">
                Serves *
              </label>
              <input
                type="text"
                value={formData.serves}
                onChange={(e) =>
                  setFormData({ ...formData, serves: e.target.value })
                }
                className="ghibli-input"
                placeholder="e.g., 2–3 spirits"
              />
              {errors.serves && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.serves}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-cocoa-dark dark:text-dark-cocoa-dark mb-1">
              Mood
            </label>
            <input
              type="text"
              value={formData.mood}
              onChange={(e) =>
                setFormData({ ...formData, mood: e.target.value })
              }
              className="ghibli-input"
              placeholder="e.g., Sweet | Cozy brunch | Weekend treat"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cocoa-dark dark:text-dark-cocoa-dark mb-2">
              Recipe Image *
            </label>

            {/* Toggle between upload and URL */}
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => {
                  setImageSource("upload");
                  setFormData({ ...formData, image: "" });
                  setImagePreview(null);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  imageSource === "upload"
                    ? "bg-cocoa dark:bg-dark-cocoa text-cream dark:text-dark-cream"
                    : "bg-sage/20 dark:bg-dark-sage/20 text-cocoa-dark dark:text-dark-cocoa-dark hover:bg-sage/30 dark:hover:bg-dark-sage/30"
                }`}
              >
                📷 Upload Image
              </button>
              <button
                type="button"
                onClick={() => {
                  setImageSource("url");
                  setFormData({ ...formData, image: "" });
                  setImagePreview(null);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  imageSource === "url"
                    ? "bg-cocoa dark:bg-dark-cocoa text-cream dark:text-dark-cream"
                    : "bg-sage/20 dark:bg-dark-sage/20 text-cocoa-dark dark:text-dark-cocoa-dark hover:bg-sage/30 dark:hover:bg-dark-sage/30"
                }`}
              >
                🔗 Image URL
              </button>
            </div>

            {/* File upload input */}
            {imageSource === "upload" && (
              <div className="space-y-2">
                <label
                  htmlFor="image-upload"
                  className="block cursor-pointer"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div
                    className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-xl transition bg-sage/5 dark:bg-dark-sage/5 ${
                      isDragging
                        ? "border-cocoa dark:border-dark-cocoa bg-sage/20 dark:bg-dark-sage/20"
                        : "border-sage dark:border-dark-sage hover:border-cocoa dark:hover:border-dark-cocoa"
                    }`}
                  >
                    <div className="text-center">
                      <span className="text-2xl mb-2 block">📤</span>
                      <span className="text-sm text-cocoa-dark dark:text-dark-cocoa-dark">
                        {isDragging
                          ? "Drop image here"
                          : "Click to upload or drag and drop"}
                      </span>
                      <span className="text-xs text-cocoa-dark/60 dark:text-dark-cocoa-dark/60 block mt-1">
                        PNG, JPG, GIF up to 5MB
                      </span>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </label>
              </div>
            )}

            {/* URL input */}
            {imageSource === "url" && (
              <input
                type="url"
                value={formData.image}
                onChange={handleImageUrlChange}
                className="ghibli-input"
                placeholder="https://..."
              />
            )}

            {/* Image preview */}
            {imagePreview && (
              <div className="mt-3">
                <p className="text-xs text-cocoa-dark/70 dark:text-dark-cocoa-dark/70 mb-2">
                  Preview:
                </p>
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-sage/30 dark:border-dark-sage/30">
                  <img
                    src={imagePreview}
                    alt="Recipe preview"
                    className="w-full h-full object-cover"
                    onError={() => {
                      setImagePreview(null);
                      setErrors({
                        ...errors,
                        image: "Failed to load image. Please check the URL or try uploading a file.",
                      });
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, image: "" });
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                    aria-label="Remove image"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {errors.image && (
              <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                {errors.image}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-cocoa-dark dark:text-dark-cocoa-dark">
                Ingredients *
              </label>
              <button
                type="button"
                onClick={addIngredient}
                className="text-xs text-cocoa dark:text-dark-cocoa hover:underline"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                    className="ghibli-input flex-1"
                    placeholder={`Ingredient ${index + 1}`}
                  />
                  {formData.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="px-3 py-2 rounded-lg text-cocoa-dark dark:text-dark-cocoa-dark hover:bg-sage/20 dark:hover:bg-dark-sage/20 transition"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errors.ingredients && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {errors.ingredients}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-cocoa-dark dark:text-dark-cocoa-dark">
                Steps *
              </label>
              <button
                type="button"
                onClick={addStep}
                className="text-xs text-cocoa dark:text-dark-cocoa hover:underline"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {formData.steps.map((step, index) => (
                <div key={index} className="flex gap-2">
                  <span className="mt-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sage/80 dark:bg-dark-sage/80 text-xs font-semibold text-cocoa-dark dark:text-dark-cocoa-dark">
                    {index + 1}
                  </span>
                  <textarea
                    value={step}
                    onChange={(e) => updateStep(index, e.target.value)}
                    className="ghibli-textarea flex-1"
                    placeholder={`Step ${index + 1}`}
                    rows="2"
                  />
                  {formData.steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      className="px-3 py-2 rounded-lg text-cocoa-dark dark:text-dark-cocoa-dark hover:bg-sage/20 dark:hover:bg-dark-sage/20 transition self-start"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errors.steps && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {errors.steps}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-sage/30 dark:border-dark-sage/30">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-full border border-sage dark:border-dark-sage text-cocoa-dark dark:text-dark-cocoa-dark hover:bg-sage/10 dark:hover:bg-dark-sage/10 transition"
            >
              Cancel
            </button>
            <button type="submit" className="ghibli-button">
              {recipe ? "Save Changes" : "Add Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
