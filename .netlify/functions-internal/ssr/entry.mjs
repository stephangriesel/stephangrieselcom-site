import { renderers } from './renderers.mjs';
import { manifest } from './manifest_DuNaeUX3.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_1SBOfc61.mjs');
const _page1 = () => import('./chunks/guestbook_C4kMpYpH.mjs');
const _page2 = () => import('./chunks/index_DXsEef_h.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@4.5.9_@types+node@20.11.30_typescript@5.4.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/guestbook.astro", _page1],
    ["src/pages/index.astro", _page2]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "9496352b-9746-4e7b-a2ad-c784f51b52b2"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
