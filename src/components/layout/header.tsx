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
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-primary font-bold text-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-[#B22222]"
            >
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM6 12c0-1.5.5-3 1.5-4.1C8.5 6.5 10.5 6 12 6s3.5.5 4.5 1.9C17.5 9 18 10.5 18 12s-.5 3-1.5 4.1C15.5 17.5 13.5 18 12 18s-3.5-.5-4.5-1.9C6.5 15 6 13.5 6 12z" />
            </svg>
          </div>
          <span className="text-2xl font-bold #B22222">FlashFood</span>
        </Link>

        <nav className="flex items-center space-x-4">
          <Link to="/cart">
            <Button variant="ghost" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
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
