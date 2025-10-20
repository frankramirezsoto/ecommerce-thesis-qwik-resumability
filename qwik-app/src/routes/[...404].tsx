import { component$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { Button } from '@/components/ui/Button';

export default component$(() => {
  const navigate = useNavigate();

  return (
    <div class="min-h-screen flex items-center justify-center">
      <div class="text-center space-y-4 px-4">
        <h1 class="text-5xl font-bold">404</h1>
        <p class="text-muted-foreground text-lg">The page you're looking for was not found.</p>
        <Button onClick$={() => navigate('/')}>
          Go home
        </Button>
      </div>
    </div>
  );
});
