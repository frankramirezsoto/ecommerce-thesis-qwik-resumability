import { $, component$, useStore } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/Button';
import { useAppContext } from '@/contexts/app-context';
import { api } from '@/lib/api';
import type { Product } from '@/types';
import {
  ArrowRightIcon,
  ShoppingBagIcon,
  SparklesIcon,
  TrendingUpIcon,
} from '@/components/icons';
import { useVisibleTask$ } from '@builder.io/qwik';

export default component$(() => {
  const navigate = useNavigate();
  const app = useAppContext();
  const state = useStore<{ featured: Product[]; loading: boolean }>({
    featured: [],
    loading: true,
  });

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

  const categories = [
    { name: "Men's Fashion", path: "men's clothing", icon: ShoppingBagIcon },
    { name: "Women's Fashion", path: "women's clothing", icon: SparklesIcon },
    { name: 'Electronics', path: 'electronics', icon: TrendingUpIcon },
    { name: 'Jewelry', path: 'jewelery', icon: SparklesIcon },
  ];

  useVisibleTask$(async () => {
    try {
      const products = await api.getAllProducts();
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      state.featured = shuffled.slice(0, 4);
    } catch (error) {
      console.error(error);
      app.addToast({
        title: 'Error',
        description: 'Failed to load products',
        variant: 'destructive',
      });
    } finally {
      state.loading = false;
    }
  });

  return (
    <div class="min-h-screen">
      <section class="relative overflow-hidden bg-gradient-hero text-white">
        <div class="absolute inset-0 opacity-20"></div>
        <div class="container mx-auto px-4 py-20 sm:py-32 relative">
          <div class="max-w-3xl animate-fade-in">
            <h1 class="text-4xl sm:text-6xl font-bold mb-6">Discover Your Style</h1>
            <p class="text-lg sm:text-xl text-white/90 mb-8">
              Explore our curated collection of premium products with unbeatable prices
            </p>
            <div class="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" class="group" onClick$={() => navigate('/products')}>
                Shop Now
                <ArrowRightIcon class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                class="bg-white/10 hover:bg-white/20 text-white border-white/30"
                onClick$={() => navigate('/products')}
              >
                View Deals
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section class="py-16 bg-secondary/30">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.path}
                  class="group cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick$={() => navigate(`/products?category=${category.path}`)}
                >
                  <div class="bg-card rounded-lg p-6 text-center transition-all hover:shadow-hover border">
                    <Icon class="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 class="font-semibold">{category.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section class="py-16">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-3xl font-bold">Featured Products</h2>
            <Button variant="ghost" onClick$={() => navigate('/products')}>
              View All
              <ArrowRightIcon class="ml-2 h-4 w-4" />
            </Button>
          </div>

          {state.loading ? (
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} class="h-96 bg-secondary/30 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {state.featured.map((product, index) => (
                <div key={product.id} class="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProductCard product={product} onAddToCart$={handleAddToCart} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section class="py-16 bg-gradient-to-br from-accent to-secondary">
        <div class="container mx-auto px-4 text-center">
          <div class="max-w-2xl mx-auto">
            <h2 class="text-3xl font-bold mb-4 text-accent-foreground">Special Offer!</h2>
            <p class="text-lg mb-6 text-accent-foreground/80">
              Sign up today and get exclusive access to member-only deals and promotions
            </p>
            <Button size="lg" onClick$={() => navigate('/auth')}>
              Get Started
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
});
