import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { PermissionsSettings } from '../../components/admin/PermissionsSettings';

export function Settings() { // Renomeado para 'Settings' para refletir o nome do arquivo
  const { user, setUser } = useStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'permissions' | 'menu'>('profile');

  console.log('Aba ativa:', activeTab);
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Configurações</h1>

      {/* Menu de abas */}
      <div className="flex space-x-4 border-b">
        <button
          className={`px-4 py-2 ${activeTab === 'profile' ? 'border-b-2 border-red-500 font-bold' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Meu Perfil
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'permissions' ? 'border-b-2 border-red-500 font-bold' : ''}`}
          onClick={() => setActiveTab('permissions')}
        >
          Regras & Permissões
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'menu' ? 'border-b-2 border-red-500 font-bold' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          Cardápio
        </button>
      </div>

      {/* Conteúdo da aba ativa */}
      {activeTab === 'profile' && <ProfileSettings user={user} setUser={setUser} />}
      {activeTab === 'permissions' && <PermissionsSettings />}
      {activeTab === 'menu' && <MenuSettings />}
    </div>
  );
}

// Configuração do perfil
function ProfileSettings({ user, setUser }: { user: any; setUser: any }) {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
    password: '',
    confirmPassword: '',
  });

  const handleSave = () => {
    if (form.password !== form.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    setUser({ ...user, ...form });
    alert('Perfil atualizado!');
  };

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Editar Perfil</h2>
      <Input
        label="Nome"
        type="text"
        placeholder="Nome"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Input
        label="Email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <Input
        label="Telefone"
        type="text"
        placeholder="Telefone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <div>
        <label className="block text-sm font-bold mb-2">Avatar</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setForm({ ...form, avatar: URL.createObjectURL(file) });
            }
          }}
          className="w-full"
        />
        {form.avatar && <img src={form.avatar} alt="Avatar" className="mt-4 w-16 h-16 rounded-full" />}
      </div>
      <Input
        label="Nova Senha"
        type="password"
        placeholder="Nova Senha"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <Input
        label="Confirme a Nova Senha"
        type="password"
        placeholder="Confirme a Nova Senha"
        value={form.confirmPassword}
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
      />
      <Button className="bg-green-500" onClick={handleSave}>
        Salvar Alterações
      </Button>
    </Card>
  );
}

// Configuração do cardápio
function MenuSettings() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold">Configurar Cardápio</h2>
      <p>Funcionalidade para personalizar o cardápio, como categorias, cores e imagens.</p>
    </Card>
  );
}
