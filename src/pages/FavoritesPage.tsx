import React from 'react';
import { useRecipeStore } from '../store/recipeStore';
import { RecipeCard } from '../components/RecipeCard';
import { Ingredient } from '../types/recipe';

export function FavoritesPage() {
  const { favorites } = useRecipeStore();

  const combinedIngredients = favorites.reduce((acc: Ingredient[], recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const existingIngredient = acc.find((i) => i.name === ingredient.name);
      if (existingIngredient) {
        existingIngredient.measure += `, ${ingredient.measure}`;
      } else {
        acc.push({ ...ingredient });
      }
    });
    return acc;
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Favorite Recipes</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">No favorite recipes yet</p>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Selected Recipes ({favorites.length})
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {favorites.map((recipe) => (
                <RecipeCard key={recipe.idMeal} recipe={recipe} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Combined Ingredients
            </h2>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <ul className="space-y-2">
                {combinedIngredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="mr-2">•</span>
                    <span className="font-medium">{ingredient.name}</span>
                    <span className="ml-2 text-gray-500">({ingredient.measure})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}