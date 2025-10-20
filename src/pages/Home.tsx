import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/types';
import { api } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag, Sparkles, TrendingUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface HomeProps {
  onAddToCart: (product: Product) => void;
}

export default function Home({ onAddToCart }: HomeProps) {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await api.getAllProducts();
        // Get random 4 products for featured section
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, 4));
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load products',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const categories = [
    { name: "Men's Fashion", path: 'men\'s clothing', icon: ShoppingBag },
    { name: "Women's Fashion", path: 'women\'s clothing', icon: Sparkles },
    { name: 'Electronics', path: 'electronics', icon: TrendingUp },
    { name: 'Jewelry', path: 'jewelery', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAxMmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="container mx-auto flex flex-col lg:flex-row justify-center">
          <div className="animate-fade-in me-0 lg: me-20 mt-32 lg:my-20">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Discover Your Style
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8">
              Explore our curated collection of premium products with unbeatable prices
            </p>
            <div className="absolute flex flex-wrap gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate('/products')}
                className="group"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          <div className='flex justify-end animate-float-in'>
            <img
              src="hero.png"
              alt="Hero Image"
              className="max-w-sm opacity-90 animate-float-in"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.path}
                  className="group cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(`/products?category=${category.path}`)}
                >
                  <div className="bg-card rounded-lg p-6 text-center transition-all hover:shadow-hover border">
                    <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold">{category.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button variant="ghost" onClick={() => navigate('/products')}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-96 bg-secondary/30 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} onAddToCart={onAddToCart} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 bg-gradient-to-br from-accent to-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-accent-foreground">
              Special Offer!
            </h2>
            <p className="text-lg mb-6 text-accent-foreground/80">
              Sign up today and get exclusive access to member-only deals and promotions
            </p>
            <Button size="lg" onClick={() => navigate('/auth')}>
              Get Started
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
