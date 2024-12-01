import { useStore } from '../../store/useStore';
// import { Button } from '../../components/ui/button';

export function AdminOrders() {
  const { orders, updateOrderStatus } = useStore();

  // Opções de status disponíveis
  const statusOptions = ['pending', 'preparing', 'delivering', 'delivered'];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gerenciar Pedidos</h1>

      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Pedido #{order.id}</h2>
                <p className="text-sm text-gray-600">
                  <strong>Data:</strong> {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Cliente:</strong> {order.customerInfo?.name || 'Cliente Anônimo'}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Endereço:</strong> {order.customerInfo?.address || 'Endereço não informado'}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Telefone:</strong> {order.customerInfo?.phone || 'Telefone não informado'}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Total:</strong> R$ {order.total.toFixed(2)}
                </p>
              </div>

              <div className="mt-4 space-y-2">
                <h3 className="font-semibold">Itens do Pedido:</h3>
                <ul className="list-disc pl-6">
                  {order.items.map(item => (
                    <li key={item.id} className="text-sm text-gray-600">
                      {item.quantity}x {item.name} - R$ {(item.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 space-y-2">
                <h3 className="font-semibold">Status do Pedido:</h3>
                <select 
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as 'delivered' | 'pending' | 'preparing' | 'delivering')}
                    className="w-full p-2 border rounded"
                    >
                    {statusOptions.map((status) => (
                        <option key={status} value={status}>
                        {status === 'pending'
                            ? 'Pendente'
                            : status === 'preparing'
                            ? 'Preparando'
                            : status === 'delivering'
                            ? 'Em Entrega'
                            : 'Entregue'}
                        </option>
                    ))}
                    </select>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Nenhum pedido disponível no momento.</p>
      )}
    </div>
  );
}
