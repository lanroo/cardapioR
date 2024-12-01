import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/button';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Gerenciar mensagens de erro

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);

    if (success) {
      // Obter o usuário logado
      const { user } = useStore.getState();

      // Redirecionar com base no papel do usuário
      if (user?.role === 'admin') {
        navigate('/admin'); // Redirecionar para o Dashboard Admin
      } else {
        navigate('/'); // Redirecionar para a página inicial (Menu)
      }
    } else {
      setError('Email ou senha inválidos.'); // Exibir mensagem de erro
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-gray-600">Entre para acessar sua conta</p>
        {error && <p className="text-red-500">{error}</p>} {/* Exibe erro */}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>

      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => navigate('/register')}
        >
          Não tem uma conta? Cadastre-se
        </Button>
      </div>
    </div>
  );
}
