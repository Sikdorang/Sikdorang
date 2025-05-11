import { QueryClient } from '@tanstack/react-query';

export const invalidateQueries = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ['categories'] });
  queryClient.invalidateQueries({ queryKey: ['menus'] });
  queryClient.invalidateQueries({ queryKey: ['categoriesAndMenus'] });
};
