import { component$, Slot, type QwikIntrinsicElements } from '@builder.io/qwik';

export type BadgeProps = QwikIntrinsicElements['span'] & {
  variant?: 'default' | 'destructive';
};

const variants: Record<string, string> = {
  default: 'bg-primary text-primary-foreground',
  destructive: 'bg-red-500 text-white',
};

export const Badge = component$<BadgeProps>(({ variant = 'default', class: className = '', ...props }) => {
  const variantClass = variants[variant] ?? variants.default;
  return (
    <span
      class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantClass} ${className}`}
      {...props}
    >
      <Slot />
    </span>
  );
});
