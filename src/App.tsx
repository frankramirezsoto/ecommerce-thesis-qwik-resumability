import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';
import { Product, CartItem } from './types';
import { storage } from './lib/storage';
import { toast } from './hooks/use-toast';

const queryClient = new QueryClient();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState(storage.getUser());

  useEffect(() => {
    setCart(storage.getCart());

    const handleUserChange = () => setUser(storage.getUser());
    window.addEventListener('user-changed', handleUserChange);
    return () => window.removeEventListener('user-changed', handleUserChange);
  }, []);

  useEffect(() => {
    storage.saveCart(cart);
  }, [cart]);

  const handleAddToCart = (product: Product) => {
    if (!user) {
      toast({
        title: 'Please login',
        description: 'You need to login to add items to cart',
        variant: 'destructive',
      });
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    toast({
      title: 'Added to cart',
      description: `${product.title} has been added to your cart`,
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: 'Removed from cart',
      description: 'Item has been removed from your cart',
    });
  };

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return user ? <>{children}</> : <Navigate to="/auth" replace />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navbar
              cartItemsCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
              onCartClick={() => setCartOpen(true)}
            />
            <Routes>
              <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
              <Route
                path="/products"
                element={<Products onAddToCart={handleAddToCart} />}
              />
              <Route
                path="/product/:id"
                element={<ProductDetail onAddToCart={handleAddToCart} />}
              />
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CartDrawer
              open={cartOpen}
              onOpenChange={setCartOpen}
              items={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </div>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
