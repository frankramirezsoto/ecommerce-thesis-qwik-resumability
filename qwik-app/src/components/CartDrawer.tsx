import { component$, useComputed$, $ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { useAppContext } from '@/contexts/app-context';
import { Button } from '@/components/ui/Button';
import { MinusIcon, PlusIcon, TrashIcon } from '@/components/icons';
import { formatCurrency } from '@/lib/utils';

export const CartDrawer = component$(() => {
  const app = useAppContext();
  const navigate = useNavigate();

  const total = useComputed$(() =>
    app.state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  const handleCheckout = $(() => {
    app.toggleCart(false);
    navigate('/checkout');
  });

  return (
    <div
      class={`fixed inset-0 z-50 transition ${
        app.state.cartOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div
        class={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
          app.state.cartOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick$={() => app.toggleCart(false)}
      />
      <aside
        class={`absolute right-0 top-0 h-full w-full sm:max-w-lg bg-white shadow-xl transition-transform duration-300 flex flex-col ${
          app.state.cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div class="px-6 py-4 border-b">
          <h2 class="text-lg font-semibold">Shopping Cart ({app.state.cart.length})</h2>
        </div>
        <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {app.state.cart.length === 0 ? (
            <div class="flex flex-col items-center justify-center text-center h-full text-muted-foreground gap-3">
              <p>Your cart is empty</p>
              <Button
                variant="outline"
                onClick$={() => {
                  app.toggleCart(false);
                  navigate('/products');
                }}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            app.state.cart.map((item) => (
              <div key={item.id} class="flex gap-4 p-4 rounded-lg border bg-card">
                <img src={item.image} alt={item.title} class="h-20 w-20 object-contain rounded" />
                <div class="flex-1">
                  <h4 class="font-medium line-clamp-2 mb-2">{item.title}</h4>
                  <p class="font-semibold text-primary">{formatCurrency(item.price)}</p>
                  <div class="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      class="h-8 w-8"
                      onClick$={() => app.updateQuantity(item.id, item.quantity - 1)}
                    >
                      <MinusIcon class="h-4 w-4" />
                    </Button>
                    <span class="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      class="h-8 w-8"
                      onClick$={() => app.updateQuantity(item.id, item.quantity + 1)}
                    >
                      <PlusIcon class="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      class="h-8 w-8 ml-auto text-red-500"
                      onClick$={() => app.removeItem(item.id)}
                    >
                      <TrashIcon class="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {app.state.cart.length > 0 && (
          <div class="border-t px-6 py-4 space-y-4">
            <div class="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span class="text-primary">{formatCurrency(total.value)}</span>
            </div>
            <Button class="w-full" size="lg" onClick$={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        )}
      </aside>
    </div>
  );
});
