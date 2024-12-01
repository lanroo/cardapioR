import { useStore } from '../../store/useStore';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement);

export function AdminOverview() {
  const { orders } = useStore();

  // Dados para os gráficos
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(order => order.status === 'delivered').length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;

  const dailyRevenue = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString();
    if (!acc[date]) acc[date] = 0;
    acc[date] += order.total;
    return acc;
  }, {} as Record<string, number>);

  const barData = {
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

  const doughnutData = {
    labels: ['Entregues', 'Pendentes'],
    datasets: [
      {
        data: [deliveredOrders, pendingOrders],
        backgroundColor: ['#4CAF50', '#FFC107'],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Visão Geral</h1>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">Total de Vendas</h2>
          <p className="text-2xl font-semibold text-green-600">R$ {totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">Pedidos Totais</h2>
          <p className="text-2xl font-semibold">{totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">Pedidos Pendentes</h2>
          <p className="text-2xl font-semibold text-yellow-600">{pendingOrders}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Vendas Diárias</h2>
          {Object.keys(dailyRevenue).length > 0 ? (
            <Bar data={barData} />
          ) : (
            <p className="text-gray-600">Sem dados para exibir.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Status dos Pedidos</h2>
          <Doughnut data={doughnutData} />
        </div>
      </div>

      {/* Detalhes Recentes */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-lg font-bold mb-4">Pedidos Recentes</h2>
        {orders.length > 0 ? (
          <ul className="divide-y">
            {orders.slice(0, 5).map(order => (
              <li key={order.id} className="py-2 flex justify-between">
                <span>Pedido #{order.id}</span>
                <span className="text-sm text-gray-600">R$ {order.total.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Nenhum pedido recente.</p>
        )}
      </div>
    </div>
  );
}
