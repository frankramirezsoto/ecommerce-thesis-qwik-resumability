import { component$, Slot, type QwikIntrinsicElements } from '@builder.io/qwik';

export type CardProps = QwikIntrinsicElements['div'];

const base = 'rounded-xl border border-border bg-card text-card-foreground shadow-sm';

export const Card = component$<CardProps>(({ class: className = '', ...props }) => {
  return (
    <div class={`${base} ${className}`} {...props}>
      <Slot />
    </div>
  );
});

export const CardHeader = component$<CardProps>(({ class: className = '', ...props }) => (
  <div class={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    <Slot />
  </div>
));

export const CardTitle = component$<CardProps>(({ class: className = '', ...props }) => (
  <h3 class={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
    <Slot />
  </h3>
));

export const CardDescription = component$<CardProps>(({ class: className = '', ...props }) => (
  <p class={`text-sm text-muted-foreground ${className}`} {...props}>
    <Slot />
  </p>
));

export const CardContent = component$<CardProps>(({ class: className = '', ...props }) => (
  <div class={`p-6 pt-0 ${className}`} {...props}>
    <Slot />
  </div>
));

export const CardFooter = component$<CardProps>(({ class: className = '', ...props }) => (
  <div class={`flex items-center p-6 pt-0 ${className}`} {...props}>
    <Slot />
  </div>
));
