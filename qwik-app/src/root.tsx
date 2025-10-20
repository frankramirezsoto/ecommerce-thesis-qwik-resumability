import { component$ } from '@builder.io/qwik';
import { RouterOutlet } from '@builder.io/qwik-city';
import './global.css';

export default component$(() => {
  return <RouterOutlet />;
});
