import { useStore } from '../../store/useStore';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement);

export function AdminOverview() {
  const { orders } = useStore();

  // Calcular estatísticas gerais
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = orders.length;
  const totalPendingOrders = orders.filter((order) => order.status === 'pending').length;
  const totalDeliveredOrders = orders.filter((order) => order.status === 'delivered').length;

  // Processar dados para gráfico
  const dailyRevenue = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + order.total;
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(dailyRevenue),
    datasets: [
      {
        label: 'Vendas Diárias',
        data: Object.values(dailyRevenue),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Visão Geral</h1>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Total de Vendas</h2>
          <p className="text-xl">R$ {totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Pedidos Totais</h2>
          <p className="text-xl">{totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Pedidos Pendentes</h2>
          <p className="text-xl">{totalPendingOrders}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Pedidos Entregues</h2>
          <p className="text-xl">{totalDeliveredOrders}</p>
        </div>
      </div>

      {/* Gráfico de Vendas Diárias */}
      <div className="mt-6 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Vendas Diárias</h2>
        {Object.keys(dailyRevenue).length > 0 ? (
          <Bar data={chartData} />
        ) : (
          <p className="text-gray-500">Sem dados de vendas para exibir.</p>
        )}
      </div>

      {/* Pedidos Recentes */}
      <div className="mt-6 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Pedidos Recentes</h2>
        {orders.length > 0 ? (
          <ul className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <li key={order.id} className="border-b pb-4">
                <p className="font-semibold">Pedido #{order.id}</p>
                <p>
                  Total: <span className="font-bold">R$ {order.total.toFixed(2)}</span>
                </p>
                <p>Status: <span className="text-gray-600">{order.status}</span></p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhum pedido recente.</p>
        )}
      </div>
    </div>
  );
}
