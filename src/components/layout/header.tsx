import { ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useStore } from '../../store/useStore';

export function Header() {
  const { cart, user } = useStore();
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Restaurante
        </Link>

        <nav className="flex items-center space-x-4">
          <Link to="/cart">
            <Button variant="ghost" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>
          
          {user ? (
            <Link to="/profile">
              <Button variant="ghost">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}