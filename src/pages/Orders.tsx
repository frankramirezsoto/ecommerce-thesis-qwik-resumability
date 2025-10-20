import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order } from '@/types';
import { storage } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Calendar, DollarSign, ShoppingBag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const user = storage.getUser();
    if (!user) {
      navigate('/auth');
      return;
    }

    setOrders(storage.getOrders());
  }, [navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-6">
            Start shopping to see your orders here
          </p>
          <Button onClick={() => navigate('/products')}>
            <ShoppingBag className="h-4 w-4 mr-2" />
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            View and track your order history
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-secondary/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg mb-2">
                      Order #{order.id}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(order.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        ${order.total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <Badge variant="default" className="w-fit">
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={`${item.id}-${index}`}>
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-20 w-20 object-contain rounded border"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium line-clamp-2 mb-1">
                            {item.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Quantity: {item.quantity}
                          </p>
                          <p className="font-semibold text-primary">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      {index < order.items.length - 1 && (
                        <Separator className="mt-4" />
                      )}
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
}
