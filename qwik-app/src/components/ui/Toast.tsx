import { component$, useStylesScoped$ } from '@builder.io/qwik';
import type { ToastMessage } from '@/types';

const styles = `
.toast-enter {
  opacity: 0;
  transform: translateY(12px);
}
.toast-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
}
`;

interface ToastProps {
  toasts: ToastMessage[];
}

export const ToastViewport = component$<ToastProps>(({ toasts }) => {
  useStylesScoped$(styles);

  return (
    <div class="fixed bottom-6 right-6 flex flex-col gap-3 z-[60]">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          class={`toast-enter toast-enter-active w-72 rounded-lg border border-border bg-card p-4 shadow-lg ${
            toast.variant === 'destructive' ? 'border-red-500' : ''
          }`}
        >
          <h4 class="font-semibold text-sm">{toast.title}</h4>
          {toast.description && (
            <p class="text-sm text-muted-foreground mt-1">{toast.description}</p>
          )}
        </div>
      ))}
    </div>
  );
});
