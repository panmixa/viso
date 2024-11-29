import { useQuery } from '@tanstack/react-query';
import { getRecipeById } from '../services/api';

export function useRecipe(id: string) {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: () => getRecipeById(id),
    enabled: !!id,
  });
}