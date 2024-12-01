import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, ClipboardList, Menu as MenuIcon, Settings } from 'lucide-react';
import { AdminOverview } from './overview';
import { AdminUsers } from './users';
import { AdminOrders } from './orders';
import { AdminMenu } from './menu';
import { AdminSettings } from './settings';
import { Button } from '../../components/ui/button';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState('overview');

  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard, path: '/admin' },
    { id: 'users', label: 'Clientes', icon: Users, path: '/admin/users' },
    { id: 'orders', label: 'Pedidos', icon: ClipboardList, path: '/admin/orders' },
    { id: 'menu', label: 'Cardápio', icon: MenuIcon, path: '/admin/menu' },
    { id: 'settings', label: 'Configurações', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentSection === item.id ? 'primary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => {
                  setCurrentSection(item.id);
                  navigate(item.path);
                }}
              >
                <Icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <Routes>
          <Route index element={<AdminOverview />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="settings" element={<AdminSettings />} />
        </Routes>
      </main>
    </div>
  );
}
