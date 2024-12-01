import { useStore } from '../../store/useStore';

export function AdminOrders() {
  const { orders, updateOrderStatus } = useStore();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gerenciar Pedidos</h1>
      {orders.map((order) => (
        <div key={order.id} className="p-4 mb-4 bg-white rounded shadow">
          <p>Pedido #{order.id}</p>
          <p>Total: R$ {order.total.toFixed(2)}</p>
          <select
  value={order.status}
  onChange={(e) => updateOrderStatus(order.id, e.target.value as 'pending' | 'preparing' | 'delivering' | 'delivered')}
  className="border p-2 rounded"
>
        <option value="pending">Pendente</option>
        <option value="preparing">Preparando</option>
        <option value="delivering">Em Entrega</option>
        <option value="delivered">Entregue</option>
        </select>
        </div>
      ))}
    </div>
  );
}
