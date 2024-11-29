import React from 'react';
import { useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useRecipe } from '../hooks/useRecipe';
import { useRecipeStore } from '../store/recipeStore';

export function RecipePage() {
  const { id = '' } = useParams<{ id: string }>();
  const { data: recipe, isLoading } = useRecipe(id);
  const { addToFavorites, removeFromFavorites, isInFavorites } = useRecipeStore();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl text-gray-600">Recipe not found</p>
      </div>
    );
  }

  const isFavorite = isInFavorites(recipe.idMeal);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">{recipe.strMeal}</h1>
            <button
              onClick={toggleFavorite}
              className="rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-100"
            >
              <Heart
                className={`h-6 w-6 ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'
                }`}
              />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-800">
              {recipe.strCategory}
            </span>
            <span className="rounded-full bg-green-100 px-4 py-2 text-green-800">
              {recipe.strArea}
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="mr-2">•</span>
                  <span className="font-medium">{ingredient.name}</span>
                  <span className="ml-2 text-gray-500">({ingredient.measure})</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Instructions</h2>
            <p className="whitespace-pre-line text-gray-700">{recipe.strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}