import { useState } from 'react';
import { MenuItemCard } from '../components/menu/menu-item-card';
import { CategoryFilter } from '../components/menu/category-filter';
import { menuItems } from '../data/menu';

export function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems = selectedCategory
    ? menuItems.filter((item) => item.category === selectedCategory)
    : menuItems;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Cardápio</h1>
      
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}