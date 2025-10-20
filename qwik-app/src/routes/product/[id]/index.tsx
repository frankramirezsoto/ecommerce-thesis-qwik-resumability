import { $, component$, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAppContext } from '@/contexts/app-context';
import { api } from '@/lib/api';
import type { Product } from '@/types';
import { ArrowRightIcon, ShoppingCartIcon, StarIcon } from '@/components/icons';

interface DetailState {
  product: Product | null;
  loading: boolean;
}

export default component$(() => {
  const { params } = useLocation();
  const navigate = useNavigate();
  const app = useAppContext();
  const state = useStore<DetailState>({ product: null, loading: true });

  const handleAddToCart = $((product: Product) => {
    if (!app.state.user) {
      app.addToast({
        title: 'Please login',
        description: 'You need to login to add items to cart',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }
    app.addToCart(product);
    app.addToast({
      title: 'Added to cart',
      description: `${product.title} has been added to your cart`,
    });
  });

  useVisibleTask$(async () => {
    if (!params.id) return;
    try {
      state.product = await api.getProductById(params.id);
    } catch (error) {
      console.error(error);
      app.addToast({
        title: 'Error',
        description: 'Failed to load product',
        variant: 'destructive',
      });
    } finally {
      state.loading = false;
    }
  });

  if (state.loading) {
    return (
      <div class="min-h-screen py-8">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-2 gap-8">
            <div class="aspect-square bg-secondary/30 rounded-lg animate-pulse" />
            <div class="space-y-4">
              <div class="h-8 bg-secondary/30 rounded animate-pulse" />
              <div class="h-4 bg-secondary/30 rounded animate-pulse w-3/4" />
              <div class="h-32 bg-secondary/30 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!state.product) {
    return (
      <div class="min-h-screen flex items-center justify-center">
        <div class="text-center">
          <p class="text-xl text-muted-foreground mb-4">Product not found</p>
          <Button onClick$={() => navigate('/products')}>Back to Products</Button>
        </div>
      </div>
    );
  }

  const product = state.product;

  return (
    <div class="min-h-screen py-8">
      <div class="container mx-auto px-4">
        <Button variant="ghost" onClick$={() => navigate(-1)} class="mb-6">
          <ArrowRightIcon class="h-4 w-4 mr-2 rotate-180" />
          Back
        </Button>

        <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div class="bg-secondary/30 rounded-lg p-8 flex items-center justify-center">
            <img src={product.image} alt={product.title} class="max-h-[500px] w-auto object-contain" />
          </div>

          <div class="space-y-6">
            <div>
              <Badge variant="secondary" class="mb-2">
                {product.category}
              </Badge>
              <h1 class="text-3xl font-bold mb-4">{product.title}</h1>
              <div class="flex items-center gap-2 mb-4">
                <div class="flex items-center text-primary">
                  <StarIcon class="h-5 w-5" />
                  <span class="ml-1 font-semibold text-foreground">{product.rating.rate.toFixed(1)}</span>
                </div>
                <span class="text-muted-foreground">({product.rating.count} reviews)</span>
              </div>
              <p class="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
            </div>

            <div class="border-t pt-6">
              <h2 class="font-semibold text-lg mb-2">Description</h2>
              <p class="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div class="border-t pt-6 space-y-4">
              <Button size="lg" class="w-full" onClick$={() => handleAddToCart(product)}>
                <ShoppingCartIcon class="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                class="w-full"
                onClick$={() => {
                  handleAddToCart(product);
                  navigate('/checkout');
                }}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
