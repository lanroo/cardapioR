import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

interface ProtectedRouteProps {
  children: ReactNode;
  role?: 'admin' | 'customer';
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user } = useStore();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}