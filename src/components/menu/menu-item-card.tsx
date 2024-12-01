import { MenuItem } from '../../types';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { formatPrice } from '../../lib/utils';
import { useStore } from '../../store/useStore';
import { Plus } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <Card className="overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="h-48 w-full object-cover"
      />
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
          <span className="font-bold text-blue-600">
            {formatPrice(item.price)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => addToCart(item)}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar ao Carrinho
        </Button>
      </CardContent>
    </Card>
  );
}