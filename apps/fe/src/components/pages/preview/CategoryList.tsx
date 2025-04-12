import { useQueryCategories } from '@/hooks/useQueryCategories';
import CategoryItem from '../../common/items/CategoryItem';
import { useEffect } from 'react';

interface CategoryListProps {
  selectedCategoryId: number | null;
  onSelectCategory: (id: number) => void;
}

export default function CategoryList({ selectedCategoryId, onSelectCategory }: CategoryListProps) {
  const { categories } = useQueryCategories();

  useEffect(() => {
    if (!selectedCategoryId && categories && categories.length > 0) {
      onSelectCategory(categories[0].id);
    }
  }, [categories, selectedCategoryId, onSelectCategory]);

  return (
    <ul className="flex flex-col gap-2 w-full">
      {categories &&
        categories.map((category) => (
          <CategoryItem
            key={category.id}
            isSelected={selectedCategoryId === category.id}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.category}
          </CategoryItem>
        ))}
    </ul>
  );
}
