import { useStore } from '../../store/useStore';

export function AdminOverview() {
  const { orders } = useStore();

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = orders.length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Visão Geral</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Total de Vendas</h2>
          <p className="text-xl">R$ {totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Pedidos Totais</h2>
          <p className="text-xl">{totalOrders}</p>
        </div>
      </div>
    </div>
  );
}
