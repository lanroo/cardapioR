import React from 'react';
import { MenuItem } from '../types';

interface MenuPageProps {
  menuItems: MenuItem[];
}

const MenuPage: React.FC<MenuPageProps> = ({ menuItems }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Cardápio</h1>

      <div className="menu-items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {menuItems.length === 0 ? (
          <p className="text-center text-lg text-red-600">Nenhum item disponível no cardápio.</p>
        ) : (
          menuItems.map((item) => (
            <div key={item.id} className="menu-item bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h3 className="text-xl font-semibold text-gray-900 mt-4">{item.name}</h3>
              <p className="text-gray-700 mt-2">{item.description}</p>
              <p className="text-lg font-bold text-gray-900 mt-4">Preço: R${item.price.toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MenuPage;
