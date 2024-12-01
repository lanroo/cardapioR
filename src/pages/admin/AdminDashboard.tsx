import { useState } from "react";

const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Pizza Margherita", price: 25.0, category: "Pizza" },
    { id: 2, name: "Hambúrguer Clássico", price: 18.0, category: "Hambúrguer" },
  ]);
  const [orders, setOrders] = useState([
    { id: 101, items: ["Pizza Margherita"], status: "Pending" },
    { id: 102, items: ["Hambúrguer Clássico"], status: "Delivered" },
  ]);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const handleAddMenuItem = () => {
    const newItem = { id: Date.now(), name: "Novo Item", price: 0, category: "" };
    setMenuItems([...menuItems, newItem]);
  };

  const handleEditMenuItem = (itemId: number) => {
    const item = menuItems.find((item) => item.id === itemId);
    setEditingItem(item);
  };

  const handleSaveMenuItem = () => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === editingItem.id ? editingItem : item
      )
    );
    setEditingItem(null);
  };

  const handleRemoveMenuItem = (itemId: number) => {
    const confirmDelete = window.confirm("Tem certeza que deseja remover este item?");
    if (confirmDelete) {
      setMenuItems(menuItems.filter((item) => item.id !== itemId));
    }
  };

  const handleUpdateOrderStatus = (orderId: number, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Gerenciamento do Cardápio */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Gerenciar Cardápio</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={handleAddMenuItem}
        >
          Adicionar Item
        </button>
        <ul className="list-disc pl-6">
          {menuItems.map((item) => (
            <li key={item.id} className="mb-2">
              {editingItem && editingItem.id === item.id ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="border p-1"
                    value={editingItem.name}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, name: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="border p-1"
                    value={editingItem.price}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })
                    }
                  />
                  <input
                    type="text"
                    className="border p-1"
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, category: e.target.value })
                    }
                  />
                  <button
                    className="bg-green-500 text-white px-2 rounded"
                    onClick={handleSaveMenuItem}
                  >
                    Salvar
                  </button>
                  <button
                    className="bg-gray-500 text-white px-2 rounded"
                    onClick={() => setEditingItem(null)}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <span>
                    {item.name} - R$ {item.price.toFixed(2)} ({item.category})
                  </span>
                  <button
                    className="bg-yellow-500 text-white px-2 rounded"
                    onClick={() => handleEditMenuItem(item.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 rounded"
                    onClick={() => handleRemoveMenuItem(item.id)}
                  >
                    Remover
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Gerenciamento de Pedidos */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Pedidos</h2>
        <ul className="list-disc pl-6">
          {orders.map((order) => (
            <li key={order.id} className="mb-2">
              <span>Pedido #{order.id}: {order.items.join(", ")}</span> -{" "}
              <span>Status: {order.status}</span>
              <select
                className="ml-2 p-1 border rounded"
                value={order.status}
                onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Delivered">Delivered</option>
              </select>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
