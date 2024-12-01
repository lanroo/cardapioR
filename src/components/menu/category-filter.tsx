import { Button } from '../ui/button';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const categories = [
  { id: null, label: 'Todos' },
  { id: 'pizza', label: 'Pizzas' },
  { id: 'burger', label: 'Hambúrgueres' },
  { id: 'drink', label: 'Bebidas' },
  { id: 'dessert', label: 'Sobremesas' },
];

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4">
      {categories.map((category) => (
        <Button
          key={category.id ?? 'all'}
          variant={selectedCategory === category.id ? 'primary' : 'secondary'}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}