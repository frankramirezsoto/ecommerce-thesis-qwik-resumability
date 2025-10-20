import { component$, type JSXNode, type QwikIntrinsicElements } from '@builder.io/qwik';

const Svg = (
  props: QwikIntrinsicElements['svg'],
  paths: JSXNode[],
  defaultClass?: string
) => {
  const mergedClass = [defaultClass ?? '', props.class ?? '', 'h-5 w-5']
    .filter(Boolean)
    .join(' ');
  return (
    <svg
      {...props}
      class={mergedClass}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      {paths}
    </svg>
  );
};

export const StoreIcon = component$<QwikIntrinsicElements['svg']>((props) =>
  Svg(props, [<path d="M3 9l1-5h16l1 5" />, <path d="M4 9h16v11H4z" />, <path d="M10 13h4" />], props.class)
);

export const ShoppingCartIcon = component$<QwikIntrinsicElements['svg']>((props) =>
  Svg(
    props,
    [
      <circle cx="9" cy="21" r="1" />, 
      <circle cx="20" cy="21" r="1" />, 
      <path d="M1 1h3l3.6 12.59a2 2 0 0 0 2 1.41h9.72a2 2 0 0 0 2-1.61L23 6H6" />,
    ],
    props.class
  )
);

export const UserIcon = component$<QwikIntrinsicElements['svg']>((props) =>
  Svg(props, [<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />, <circle cx="12" cy="7" r="4" />], props.class)
);

export const LogoutIcon = component$<QwikIntrinsicElements['svg']>((props) =>
  Svg(props, [<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />, <polyline points="16 17 21 12 16 7" />, <line x1="21" y1="12" x2="9" y2="12" />], props.class)
);

export const SearchIcon = component$<QwikIntrinsicElements['svg']>((props) =>
  Svg(props, [<circle cx="11" cy="11" r="8" />, <line x1="21" y1="21" x2="16.65" y2="16.65" />], props.class)
);

export const ArrowRightIcon = component$<QwikIntrinsicElements['svg']>((props) =>
  Svg(props, [<line x1="5" y1="12" x2="19" y2="12" />, <polyline points="12 5 19 12 12 19" />], props.class)
);

export const SparklesIcon = component$<QwikIntrinsicElements['svg']>((props) =>
  Svg(
    props,
    [
      <path d="M5 3v4" />, 
      <path d="M3 5h4" />, 
      <path d="M17 9v4" />, 
      <path d="M15 11h4" />, 
      <path d="M11 3l2 6-6-2 6-2-2 6z" />,
    ],
    props.class
  )
);

export const TrendingUpIcon = component$<QwikIntrinsicElements['svg']>((props) =>
  Svg(props, [<polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />, <polyline points="17 6 23 6 23 12" />], props.class)
);

export const ShoppingBagIcon = component$<QwikIntrinsicElements['svg']>((props) =>
  Svg(props, [<path d="M6 2l1.5 4H17L18.5 2" />, <path d="M6 6h12l-1 14H7L6 6z" />, <path d="M9 10a3 3 0 0 0 6 0" />], props.class)
);

export const MinusIcon = component$<QwikIntrinsicElements['svg']>((props) =>
  Svg(props, [<line x1="5" y1="12" x2="19" y2="12" />], props.class)
);

export const PlusIcon = component$<QwikIntrinsicElements['svg']>((props) =>
  Svg(props, [<line x1="12" y1="5" x2="12" y2="19" />, <line x1="5" y1="12" x2="19" y2="12" />], props.class)
);

export const TrashIcon = component$<QwikIntrinsicElements['svg']>((props) =>
  Svg(props, [<polyline points="3 6 5 6 21 6" />, <path d="M19 6l-1 14H6L5 6" />, <path d="M10 11v6" />, <path d="M14 11v6" />, <path d="M9 6V4h6v2" />], props.class)
);

export const StarIcon = component$<QwikIntrinsicElements['svg']>((props) =>
  Svg(
    props,
    [<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" stroke="none" />],
    props.class
  )
);

export const PackageIcon = component$<QwikIntrinsicElements['svg']>((props) =>
  Svg(props, [<path d="M16.5 9.4L7.55 4.24" />, <path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.26a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4.05a2 2 0 0 0 2 0l7-4.05A2 2 0 0 0 21 16z" />, <path d="M3.3 7.3L12 12l8.7-4.7" />, <path d="M12 22V12" />], props.class)
);

export const CalendarIcon = component$<QwikIntrinsicElements['svg']>((props) =>
  Svg(props, [<rect x="3" y="4" width="18" height="18" rx="2" />, <line x1="16" y1="2" x2="16" y2="6" />, <line x1="8" y1="2" x2="8" y2="6" />, <line x1="3" y1="10" x2="21" y2="10" />], props.class)
);

export const DollarIcon = component$<QwikIntrinsicElements['svg']>((props) =>
  Svg(props, [<line x1="12" y1="2" x2="12" y2="22" />, <path d="M17 7H9.5a2.5 2.5 0 0 0 0 5h5a2.5 2.5 0 0 1 0 5H6" />], props.class)
);

export const CreditCardIcon = component$<QwikIntrinsicElements['svg']>((props) =>
  Svg(props, [<rect x="2" y="4" width="20" height="16" rx="2" />, <line x1="2" y1="10" x2="22" y2="10" />, <path d="M6 16h2" />, <path d="M10 16h2" />], props.class)
);
