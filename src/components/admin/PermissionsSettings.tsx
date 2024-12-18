import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Modal } from '../ui/modal';
import { TrashIcon, EditIcon } from '../ui/icons';

interface Permission {
  id: number;
  name: string;
  description: string;
}

export function PermissionsSettings() {
  const [permissions, setPermissions] = useState<Permission[]>([
    // Exemplo inicial de permissões
    { id: 1, name: 'Admin', description: 'Acesso total ao sistema' },
    { id: 2, name: 'Editor', description: 'Pode editar conteúdos' },
    { id: 3, name: 'Viewer', description: 'Pode visualizar conteúdos' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPermission, setCurrentPermission] = useState<Permission | null>(null);
  const [form, setForm] = useState({ name: '', description: '' });

  const handleOpenModal = (permission?: Permission) => {
    if (permission) {
      setCurrentPermission(permission);
      setForm({ name: permission.name, description: permission.description });
    } else {
      setCurrentPermission(null);
      setForm({ name: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPermission(null);
    setForm({ name: '', description: '' });
  };

  const handleSave = () => {
    if (form.name.trim() === '' || form.description.trim() === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (currentPermission) {
      // Editar permissão existente
      setPermissions((prev) =>
        prev.map((perm) =>
          perm.id === currentPermission.id ? { ...perm, ...form } : perm
        )
      );
      alert('Permissão atualizada com sucesso!');
    } else {
      // Adicionar nova permissão
      const newPermission: Permission = {
        id: Date.now(),
        name: form.name,
        description: form.description,
      };
      setPermissions((prev) => [...prev, newPermission]);
      alert('Permissão adicionada com sucesso!');
    }

    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja remover esta permissão?')) {
      setPermissions((prev) => prev.filter((perm) => perm.id !== id));
      alert('Permissão removida com sucesso!');
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Gerenciar Permissões</h2>
        <Button onClick={() => handleOpenModal()} className="bg-blue-500">
          Adicionar Permissão
        </Button>
      </div>

      {/* Tabela de Permissões */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nome</th>
            <th className="border px-4 py-2">Descrição</th>
            <th className="border px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((perm) => (
            <tr key={perm.id} className="text-center">
              <td className="border px-4 py-2">{perm.id}</td>
              <td className="border px-4 py-2">{perm.name}</td>
              <td className="border px-4 py-2">{perm.description}</td>
              <td className="border px-4 py-2 flex justify-center space-x-2">
                <Button
                  onClick={() => handleOpenModal(perm)}
                  className="bg-yellow-500"
                  size="sm"
                >
                  <EditIcon />
                </Button>
                <Button
                  onClick={() => handleDelete(perm.id)}
                  className="bg-red-500"
                  size="sm"
                >
                  <TrashIcon />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para Adicionar/Editar Permissão */}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <h3 className="text-lg font-bold mb-4">
            {currentPermission ? 'Editar Permissão' : 'Adicionar Permissão'}
          </h3>
          <div className="space-y-4">
            <Input
              label="Nome"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nome da permissão"
            />
            <Input
              label="Descrição"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Descrição da permissão"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button onClick={handleCloseModal} className="bg-gray-500">
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-green-500">
              Salvar
            </Button>
          </div>
        </Modal>
      )}
    </Card>
  );
}
