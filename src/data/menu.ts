import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Pizza Margherita',
    description: 'Molho de tomate, mussarela, manjericão fresco',
    price: 45.90,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
    category: 'pizza',
  },
  {
    id: '2',
    name: 'Burger Clássico',
    description: 'Hambúrguer artesanal, queijo cheddar, alface, tomate',
    price: 32.90,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    category: 'burger',
  },
  {
    id: '3',
    name: 'Refrigerante',
    description: 'Coca-Cola 350ml',
    price: 6.90,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97',
    category: 'drink',
  },
  {
    id: '4',
    name: 'Brownie',
    description: 'Brownie caseiro com sorvete de baunilha',
    price: 18.90,
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e',
    category: 'dessert',
  },
];