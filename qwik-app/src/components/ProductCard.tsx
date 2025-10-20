import { component$, type QRL } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import type { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { StarIcon, ShoppingCartIcon } from '@/components/icons';
import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onAddToCart$: QRL<(product: Product) => void>;
}

export const ProductCard = component$(({ product, onAddToCart$ }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      class="group overflow-hidden transition-all duration-300 hover:shadow-hover cursor-pointer"
      onClick$={() => navigate(`/product/${product.id}`)}
    >
      <div class="aspect-square overflow-hidden bg-secondary/30">
        <img
          src={product.image}
          alt={product.title}
          class="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <CardContent class="p-4">
        <h3 class="font-semibold line-clamp-2 mb-2 min-h-[3rem]">{product.title}</h3>
        <div class="flex items-center gap-1 mb-2 text-primary">
          <StarIcon class="h-4 w-4" />
          <span class="text-sm font-medium text-foreground">{product.rating.rate.toFixed(1)}</span>
          <span class="text-sm text-muted-foreground">({product.rating.count})</span>
        </div>
        <p class="text-2xl font-bold text-primary">{formatCurrency(product.price)}</p>
      </CardContent>
      <CardFooter class="p-4 pt-0">
        <Button
          class="w-full"
          onClick$={(event) => {
            event.stopPropagation();
            onAddToCart$(product);
          }}
        >
          <ShoppingCartIcon class="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
});
