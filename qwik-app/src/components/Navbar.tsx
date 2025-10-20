import { component$, $, useComputed$ } from '@builder.io/qwik';
import { Link, useNavigate } from '@builder.io/qwik-city';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAppContext } from '@/contexts/app-context';
import { LogoutIcon, SearchIcon, ShoppingCartIcon, StoreIcon, UserIcon } from '@/components/icons';

export const Navbar = component$(() => {
  const app = useAppContext();
  const navigate = useNavigate();

  const cartCount = useComputed$(() =>
    app.state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );

  const handleLogout = $(() => {
    app.setUser(null);
    app.clearCart();
    navigate('/auth');
  });

  return (
    <nav class="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div class="container mx-auto px-4">
        <div class="flex h-16 items-center justify-between">
          <Link href="/" class="flex items-center gap-2 font-semibold text-xl">
            <StoreIcon class="h-6 w-6 text-primary" />
            <span>ShopHub</span>
          </Link>

          <div class="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              class="hidden sm:inline-flex"
              onClick$={() => navigate('/products')}
            >
              <SearchIcon class="h-5 w-5" />
            </Button>

            {app.state.user ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  class="hidden sm:inline-flex"
                  onClick$={() => navigate('/orders')}
                >
                  <UserIcon class="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  class="relative"
                  onClick$={() => app.toggleCart(true)}
                >
                  <ShoppingCartIcon class="h-5 w-5" />
                  {cartCount.value > 0 && (
                    <Badge
                      variant="destructive"
                      class="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {cartCount.value}
                    </Badge>
                  )}
                </Button>
                <Button variant="ghost" size="icon" onClick$={handleLogout}>
                  <LogoutIcon class="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button onClick$={() => navigate('/auth')}>Login</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
});
