import { component$, type QwikIntrinsicElements } from '@builder.io/qwik';

export type InputProps = QwikIntrinsicElements['input'];

export const Input = component$<InputProps>(({ class: className = '', ...props }) => {
  return (
    <input
      class={`flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
});
