import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Pencil, Trash2, Key } from 'lucide-react';

export function AdminUsers() {
  const { getUsers, updateUser, deleteUser, resetPassword } = useStore();
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const users = getUsers();

  const handleUpdateUser = (userId: string, data: any) => {
    updateUser(userId, data);
    setEditingUser(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gerenciar Clientes</h1>
        <Button>Adicionar Cliente</Button>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id} className="p-6">
            {editingUser === user.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  defaultValue={user.name}
                  className="w-full rounded-md border px-3 py-2"
                  onChange={(e) => handleUpdateUser(user.id, { name: e.target.value })}
                />
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full rounded-md border px-3 py-2"
                  onChange={(e) => handleUpdateUser(user.id, { email: e.target.value })}
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="secondary"
                    onClick={() => setEditingUser(null)}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={() => setEditingUser(null)}>
                    Salvar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-600">Função: {user.role}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => setEditingUser(user.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => resetPassword(user.id)}
                  >
                    <Key className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => deleteUser(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}