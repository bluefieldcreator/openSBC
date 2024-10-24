import { fromFileUrl } from 'https://deno.land/std@0.224.0/path/from_file_url.ts';
import { findRoutesRecursive } from '../utils/files.ts';
import type { Context } from 'hono';

interface Irun {
	(c: Context): Response;
}

interface routeFunc {
	run: Irun;
	options: {
		url: string;
		method: string;
		middleware: string[];
	};
}

export default {
	load: async () => {
		const routesDir = fromFileUrl(new URL('../routes', import.meta.url));
		const baseDir = routesDir.substring(
			0,
			routesDir.lastIndexOf('/routes'),
		);
		const allRoutes = await findRoutesRecursive(routesDir, baseDir);
		const routeFunctions: routeFunc[] = [];
		for (const routeFile of allRoutes) {
			const route: routeFunc = await import(`./../${routeFile}`);
			routeFunctions.push(route);
		}
		return routeFunctions;
	},
};
