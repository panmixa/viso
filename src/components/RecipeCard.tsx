import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Recipe } from '../types/recipe';
import { useRecipeStore } from '../store/recipeStore';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const { addToFavorites, removeFromFavorites, isInFavorites } = useRecipeStore();
  const isFavorite = isInFavorites(recipe.idMeal);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <Link to={`/recipe/${recipe.idMeal}`} className="group">
      <div className="relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="h-48 w-full object-cover transition-transform group-hover:scale-105"
        />
        <button
          onClick={toggleFavorite}
          className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-100"
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'
            }`}
          />
        </button>
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">{recipe.strMeal}</h3>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
              {recipe.strCategory}
            </span>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
              {recipe.strArea}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}