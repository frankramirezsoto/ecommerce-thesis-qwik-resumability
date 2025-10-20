import { component$, Slot, type QwikIntrinsicElements } from '@builder.io/qwik';

export type ButtonProps = QwikIntrinsicElements['button'] & {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
};

const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<string, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-blue-600 focus-visible:ring-primary',
  outline: 'border border-border bg-transparent hover:bg-muted text-foreground',
  ghost: 'bg-transparent hover:bg-muted text-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
};

const sizes: Record<string, string> = {
  default: 'h-10 px-4 py-2 text-sm',
  sm: 'h-9 px-3 text-sm',
  lg: 'h-11 px-8 text-base',
  icon: 'h-10 w-10',
};

export const Button = component$<ButtonProps>(({ variant = 'default', size = 'default', class: className = '', ...props }) => {
  const variantClass = variants[variant] ?? variants.default;
  const sizeClass = sizes[size] ?? sizes.default;
  return (
    <button class={`${base} ${variantClass} ${sizeClass} ${className}`} {...props}>
      <Slot />
    </button>
  );
});
