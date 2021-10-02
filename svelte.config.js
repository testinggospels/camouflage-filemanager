import preprocess from "svelte-preprocess";
/** @type {import('@sveltejs/kit').Config} */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const config = {
    kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			ssr: {
				external: Object.keys(pkg.dependencies || {})
			}
		}
	},

    preprocess: [preprocess({
        postcss: true
    })]
};

export default config;
