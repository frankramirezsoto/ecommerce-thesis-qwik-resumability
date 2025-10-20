import { qwikCity } from '@builder.io/qwik-city/middleware/node';
import render from './entry.ssr._qwik.cjs';
import qwikCityPlan from '@qwik-city-plan';

export default qwikCity(render, { qwikCityPlan });
