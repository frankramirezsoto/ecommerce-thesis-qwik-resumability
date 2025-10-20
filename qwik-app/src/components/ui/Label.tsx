import { component$, Slot, type QwikIntrinsicElements } from '@builder.io/qwik';

export type LabelProps = QwikIntrinsicElements['label'];

export const Label = component$<LabelProps>(({ class: className = '', ...props }) => {
  return (
    <label class={`text-sm font-medium leading-none ${className}`} {...props}>
      <Slot />
    </label>
  );
});
