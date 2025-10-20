import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Search, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { storage } from '@/lib/storage';
import { useState, useEffect } from 'react';

interface NavbarProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export const Navbar = ({ cartItemsCount, onCartClick }: NavbarProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(storage.getUser());

  useEffect(() => {
    const checkUser = () => setUser(storage.getUser());
    window.addEventListener('storage', checkUser);
    window.addEventListener('user-changed', checkUser);
    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('user-changed', checkUser);
    };
  }, []);

  const handleLogout = () => {
    storage.clearUser();
    storage.clearCart();
    window.dispatchEvent(new Event('user-changed'));
    navigate('/auth');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold text-xl">
            <Store className="h-6 w-6 text-primary" />
            <span>ShopHub</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/products')}
              className="hidden sm:inline-flex"
            >
              <Search className="h-5 w-5" />
            </Button>

            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/orders')}
                  className="hidden sm:inline-flex"
                >
                  <User className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCartClick}
                  className="relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate('/auth')}>
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
