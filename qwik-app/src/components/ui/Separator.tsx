import { component$, type QwikIntrinsicElements } from '@builder.io/qwik';

export type SeparatorProps = QwikIntrinsicElements['div'];

export const Separator = component$<SeparatorProps>(({ class: className = '', ...props }) => (
  <div class={`h-px w-full bg-border ${className}`} {...props} />
));
