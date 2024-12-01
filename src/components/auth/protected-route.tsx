import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

interface ProtectedRouteProps {
  children: ReactNode;
  role?: 'admin' | 'customer';
  fallbackPath?: string; 
}

export function ProtectedRoute({ children, role, fallbackPath = '/' }: ProtectedRouteProps) {
  const { user, isLoading } = useStore();

  // Mostrar um feedback enquanto carrega
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  // Redirecionar para login se não autenticado
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Redirecionar se o papel do usuário não é permitido
  if (role && user.role !== role) {
    return <Navigate to={fallbackPath} />;
  }

  // Caso autorizado, renderizar a rota
  return <>{children}</>;
}
