import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../services/api';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });
}