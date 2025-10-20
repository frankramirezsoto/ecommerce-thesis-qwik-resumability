import { component$, useStore, useTask$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import { useAppContext } from '@/contexts/app-context';
import { storage } from '@/lib/storage';
import type { Order } from '@/types';
import { CalendarIcon, DollarIcon, PackageIcon, ShoppingBagIcon } from '@/components/icons';

export default component$(() => {
  const app = useAppContext();
  const navigate = useNavigate();
  const state = useStore<{ orders: Order[] }>({ orders: [] });

  useTask$(({ track }) => {
    track(() => app.state.user);
    if (!app.state.user) {
      navigate('/auth');
      return;
    }
    state.orders = storage.getOrders();
  });

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (state.orders.length === 0) {
    return (
      <div class="min-h-screen flex items-center justify-center">
        <div class="text-center max-w-md mx-auto px-4">
          <PackageIcon class="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 class="text-2xl font-bold mb-2">No orders yet</h2>
          <p class="text-muted-foreground mb-6">Start shopping to see your orders here</p>
          <Button onClick$={() => navigate('/products')}>
            <ShoppingBagIcon class="h-4 w-4 mr-2" />
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div class="min-h-screen py-8">
      <div class="container mx-auto px-4 max-w-4xl">
        <div class="mb-8">
          <h1 class="text-4xl font-bold mb-2">My Orders</h1>
          <p class="text-muted-foreground">View and track your order history</p>
        </div>

        <div class="space-y-6">
          {state.orders.map((order) => (
            <Card key={order.id} class="overflow-hidden">
              <CardHeader class="bg-secondary/30">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle class="text-lg mb-2">Order #{order.id}</CardTitle>
                    <div class="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <div class="flex items-center gap-1">
                        <CalendarIcon class="h-4 w-4" />
                        {formatDate(order.date)}
                      </div>
                      <div class="flex items-center gap-1">
                        <DollarIcon class="h-4 w-4" />
                        {order.total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <Badge variant="default" class="w-fit">
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent class="pt-6">
                <div class="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={`${item.id}-${index}`}>
                      <div class="flex gap-4">
                        <img src={item.image} alt={item.title} class="h-20 w-20 object-contain rounded border" />
                        <div class="flex-1 min-w-0">
                          <h4 class="font-medium line-clamp-2 mb-1">{item.title}</h4>
                          <p class="text-sm text-muted-foreground mb-2">Quantity: {item.quantity}</p>
                          <p class="font-semibold text-primary">{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                      {index < order.items.length - 1 && <Separator class="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
});
