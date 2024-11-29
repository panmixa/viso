import { useQuery } from '@tanstack/react-query';
import { searchRecipes } from '../services/api';

export function useRecipes(query: string) {
  return useQuery({
    queryKey: ['recipes', query],
    queryFn: () => searchRecipes(query),
    enabled: query.length === 0 || query.length >= 2,
  });
}