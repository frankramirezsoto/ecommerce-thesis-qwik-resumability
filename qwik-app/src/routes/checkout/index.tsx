import { $, component$, useComputed$, useStore, useTask$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Separator } from '@/components/ui/Separator';
import { useAppContext } from '@/contexts/app-context';
import { storage } from '@/lib/storage';
import { formatCurrency } from '@/lib/utils';
import type { CartItem, Order } from '@/types';
import { ArrowRightIcon, CreditCardIcon, PackageIcon } from '@/components/icons';

interface CheckoutState {
  cart: CartItem[];
  isProcessing: boolean;
}

export default component$(() => {
  const app = useAppContext();
  const navigate = useNavigate();
  const state = useStore<CheckoutState>({ cart: [], isProcessing: false });

  useTask$(({ track }) => {
    track(() => app.state.user);
    if (!app.state.user) {
      navigate('/auth');
    }
  });

  useTask$(({ track }) => {
    track(() => app.state.cart);
    const cart = app.state.cart.length ? app.state.cart : storage.getCart();
    if (!cart.length) {
      app.addToast({
        title: 'Cart is empty',
        description: 'Add some items to your cart first',
      });
      navigate('/products');
    }
    state.cart = cart;
  });

  const subtotal = useComputed$(() =>
    state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const shipping = useComputed$(() => (subtotal.value > 100 ? 0 : 9.99));
  const tax = useComputed$(() => subtotal.value * 0.1);
  const total = useComputed$(() => subtotal.value + shipping.value + tax.value);

  const handleCheckout = $(async (event: Event) => {
    event.preventDefault();
    if (!state.cart.length || state.isProcessing) return;
    state.isProcessing = true;

    setTimeout(() => {
      const order: Order = {
        id: `ORD-${Date.now()}`,
        items: state.cart,
        total: total.value,
        date: new Date().toISOString(),
        status: 'completed',
      };
      storage.saveOrder(order);
      app.clearCart();
      app.addToast({
        title: 'Order placed successfully!',
        description: `Order #${order.id} has been confirmed`,
      });
      state.isProcessing = false;
      navigate('/orders');
    }, 2000);
  });

  if (!state.cart.length) {
    return null;
  }

  return (
    <div class="min-h-screen py-8">
      <div class="container mx-auto px-4 max-w-6xl">
        <Button variant="ghost" onClick$={() => navigate(-1)} class="mb-6">
          <ArrowRightIcon class="h-4 w-4 mr-2 rotate-180" />
          Back
        </Button>

        <h1 class="text-4xl font-bold mb-8">Checkout</h1>

        <div class="grid lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <form preventdefault:submit onSubmit$={handleCheckout} class="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle class="flex items-center gap-2">
                    <PackageIcon class="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent class="space-y-4">
                  <div class="grid sm:grid-cols-2 gap-4">
                    <div class="space-y-2">
                      <Label for="firstName">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div class="space-y-2">
                      <Label for="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  <div class="space-y-2">
                    <Label for="address">Address</Label>
                    <Input id="address" required />
                  </div>
                  <div class="grid sm:grid-cols-3 gap-4">
                    <div class="space-y-2">
                      <Label for="city">City</Label>
                      <Input id="city" required />
                    </div>
                    <div class="space-y-2">
                      <Label for="state">State</Label>
                      <Input id="state" required />
                    </div>
                    <div class="space-y-2">
                      <Label for="zip">ZIP Code</Label>
                      <Input id="zip" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle class="flex items-center gap-2">
                    <CreditCardIcon class="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent class="space-y-4">
                  <div class="space-y-2">
                    <Label for="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                  </div>
                  <div class="grid sm:grid-cols-3 gap-4">
                    <div class="space-y-2 sm:col-span-2">
                      <Label for="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" required />
                    </div>
                    <div class="space-y-2">
                      <Label for="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" class="w-full" disabled={state.isProcessing}>
                {state.isProcessing ? 'Processing...' : `Place Order - ${formatCurrency(total.value)}`}
              </Button>
            </form>
          </div>

          <div class="lg:col-span-1">
            <Card class="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="space-y-3">
                  {state.cart.map((item) => (
                    <div key={item.id} class="flex gap-3">
                      <img src={item.image} alt={item.title} class="h-16 w-16 object-contain rounded" />
                      <div class="flex-1 min-w-0">
                        <p class="font-medium text-sm line-clamp-2">{item.title}</p>
                        <p class="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p class="font-semibold text-sm">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal.value)}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shipping.value === 0 ? 'FREE' : formatCurrency(shipping.value)}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>{formatCurrency(tax.value)}</span>
                  </div>
                  <Separator />
                  <div class="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span class="text-primary">{formatCurrency(total.value)}</span>
                  </div>
                </div>

                {shipping.value === 0 && (
                  <div class="bg-accent/50 text-accent-foreground p-3 rounded-lg text-sm text-center">
                    🎉 You get free shipping!
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
});
