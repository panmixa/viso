const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function searchRecipes(query: string): Promise<Recipe[]> {
  const response = await fetch(`${API_BASE_URL}/search.php?s=${query}`);
  const data = await response.json();
  return formatRecipes(data.meals || []);
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
  const data = await response.json();
  const recipes = formatRecipes(data.meals || []);
  return recipes[0] || null;
}

export async function getAllCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/list.php?c=list`);
  const data = await response.json();
  return data.meals.map((category: { strCategory: string }) => category.strCategory);
}

function formatRecipes(meals: any[]): Recipe[] {
  return meals.map((meal) => {
    const ingredients: Ingredient[] = [];
    
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          name: ingredient.trim(),
          measure: measure?.trim() || '',
        });
      }
    }

    return {
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strCategory: meal.strCategory,
      strArea: meal.strArea,
      strInstructions: meal.strInstructions,
      strMealThumb: meal.strMealThumb,
      strTags: meal.strTags,
      ingredients,
    };
  });
}