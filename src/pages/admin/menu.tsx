import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/ui/button';

export function AdminMenu() {
  const { menuItems, addMenuItem, updateMenuItem, removeMenuItem } = useStore();
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const handleAddMenuItem = () => {
    const newItem = { id: Date.now(), name: 'Novo Item', price: 0, category: '' };
    addMenuItem(newItem);
  };

  const handleEditMenuItem = (id: number) => {
    const item = menuItems.find((menuItem) => menuItem.id === id);
    setEditingItem(item);
  };

  const handleSaveMenuItem = () => {
    if (editingItem) {
      updateMenuItem(editingItem.id, editingItem);
      setEditingItem(null);
    }
  };

  const handleRemoveMenuItem = (id: number) => {
    const confirmDelete = window.confirm('Tem certeza que deseja remover este item?');
    if (confirmDelete) {
      removeMenuItem(id);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gerenciar Cardápio</h1>
      <Button
        className="bg-red-600 text-white px-4 py-2 rounded"
        onClick={handleAddMenuItem}
      >
        Adicionar Novo Item
      </Button>
      <div className="space-y-4">
        {menuItems.map((item) => (
          <div key={item.id} className="p-4 bg-white rounded shadow space-y-2">
            {editingItem && editingItem.id === item.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, name: e.target.value })
                  }
                  className="w-full rounded-md border px-3 py-2"
                  placeholder="Nome do item"
                />
                <input
                  type="number"
                  value={editingItem.price}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })
                  }
                  className="w-full rounded-md border px-3 py-2"
                  placeholder="Preço"
                />
                <input
                  type="text"
                  value={editingItem.category}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, category: e.target.value })
                  }
                  className="w-full rounded-md border px-3 py-2"
                  placeholder="Categoria"
                />
                <div className="flex space-x-2">
                  <Button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={handleSaveMenuItem}
                  >
                    Salvar
                  </Button>
                  <Button
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={() => setEditingItem(null)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p>Preço: R$ {item.price.toFixed(2)}</p>
                  <p>Categoria: {item.category}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEditMenuItem(item.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleRemoveMenuItem(item.id)}
                  >
                    Remover
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
