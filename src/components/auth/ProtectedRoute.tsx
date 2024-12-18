import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: ('admin' | 'customer')[];
  permissions?: string[];
  fallbackPath?: string;
}

export function ProtectedRoute({
  children,
  roles,
  permissions,
  fallbackPath = '/',
}: ProtectedRouteProps) {
  const { user, isLoading, checkPermission } = useStore();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={fallbackPath} />;
  }

  if (permissions && !checkPermission(permissions)) {
    return <Navigate to={fallbackPath} />;
  }

  return <>{children}</>;
}
