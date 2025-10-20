import { component$, Slot } from '@builder.io/qwik';
import { useAppProvider, useAppContext } from '@/contexts/app-context';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { ToastViewport } from '@/components/ui/Toast';

export default component$(() => {
  useAppProvider();
  const app = useAppContext();

  return (
    <div class="min-h-screen bg-background">
      <Navbar />
      <main class="pb-16">
        <Slot />
      </main>
      <CartDrawer />
      <ToastViewport toasts={app.state.toasts} />
    </div>
  );
});
