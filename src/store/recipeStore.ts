import { create } from 'zustand';
import { Recipe } from '../types/recipe';

interface RecipeStore {
  favorites: Recipe[];
  addToFavorites: (recipe: Recipe) => void;
  removeFromFavorites: (id: string) => void;
  isInFavorites: (id: string) => boolean;
}

export const useRecipeStore = create<RecipeStore>((set, get) => ({
  favorites: [],
  addToFavorites: (recipe) => {
    set((state) => ({
      favorites: [...state.favorites, recipe],
    }));
  },
  removeFromFavorites: (id) => {
    set((state) => ({
      favorites: state.favorites.filter((recipe) => recipe.idMeal !== id),
    }));
  },
  isInFavorites: (id) => {
    return get().favorites.some((recipe) => recipe.idMeal === id);
  },
}));