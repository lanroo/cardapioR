import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/header';
import { MenuPage } from './pages/menu';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import CartPage from './pages/CartPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { useState, useEffect } from 'react';
import { LoadingAnimation } from './components/LoadingAnimation';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 sec
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {loading ? (
          <LoadingAnimation />
        ) : (
          <>
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<MenuPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute roles={['admin']} permissions={['manage_users']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
