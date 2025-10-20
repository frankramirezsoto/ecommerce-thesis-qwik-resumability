import { $, component$, useStore, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import { Input } from '@/components/ui/Input';
import { ProductCard } from '@/components/ProductCard';
import { useAppContext } from '@/contexts/app-context';
import { api } from '@/lib/api';
import type { Product } from '@/types';
import { SearchIcon } from '@/components/icons';

interface ProductsState {
  products: Product[];
  filtered: Product[];
  categories: string[];
  loading: boolean;
  searchTerm: string;
  selectedCategory: string;
  sortBy: string;
}

export default component$(() => {
  const app = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const state = useStore<ProductsState>({
    products: [],
    filtered: [],
    categories: [],
    loading: true,
    searchTerm: '',
    selectedCategory: 'all',
    sortBy: 'default',
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

  useVisibleTask$(async () => {
    try {
      const [products, categories] = await Promise.all([
        api.getAllProducts(),
        api.getCategories(),
      ]);
      state.products = products;
      state.categories = categories;
      const categoryParam = new URLSearchParams(location.url.search).get('category');
      if (categoryParam) {
        state.selectedCategory = categoryParam;
      }
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

  useTask$(({ track }) => {
    track(() => state.products);
    track(() => state.searchTerm);
    track(() => state.selectedCategory);
    track(() => state.sortBy);

    let result = [...state.products];

    if (state.selectedCategory !== 'all') {
      result = result.filter((p) => p.category === state.selectedCategory);
    }

    if (state.searchTerm) {
      const term = state.searchTerm.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(term));
    }

    if (state.sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === 'rating') {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    state.filtered = result;
  });

  return (
    <div class="min-h-screen py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold mb-8">All Products</h1>

        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <div class="relative flex-1">
            <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={state.searchTerm}
              onInput$={(_, element) => {
                state.searchTerm = element.value;
              }}
              class="pl-10"
            />
          </div>

          <select
            class="h-10 rounded-md border border-input bg-white px-3 text-sm"
            value={state.selectedCategory}
            onChange$={(_, element) => {
              state.selectedCategory = element.value;
            }}
          >
            <option value="all">All Categories</option>
            {state.categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <select
            class="h-10 rounded-md border border-input bg-white px-3 text-sm"
            value={state.sortBy}
            onChange$={(_, element) => {
              state.sortBy = element.value;
            }}
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {state.loading ? (
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} class="h-96 bg-secondary/30 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : state.filtered.length === 0 ? (
          <div class="text-center py-16">
            <p class="text-muted-foreground text-lg">No products found</p>
          </div>
        ) : (
          <>
            <p class="text-muted-foreground mb-4">
              Showing {state.filtered.length} products
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {state.filtered.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart$={handleAddToCart} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
});
