import { qwikCityDev } from '@builder.io/qwik-city/vite/dev-server';
import qwikCityPlan from '@qwik-city-plan';
import { render, type RenderOptions } from '@builder.io/qwik';

export default async function (opts: RenderOptions) {
  return qwikCityDev(opts, qwikCityPlan, async (request, responseStatus, responseHeaders, renderOptions) => {
    const result = await render(request, renderOptions);
    responseHeaders.set('Content-Type', 'text/html; charset=utf-8');
    return result;
  });
}
