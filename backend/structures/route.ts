import { fromFileUrl } from 'https://deno.land/std@0.224.0/path/from_file_url.ts';
import { findRoutesRecursive } from '../utils/files.ts';
import type { Context } from 'hono';
import { errorMsg } from '../utils/error.ts';

interface Irun {
	// deno-lint-ignore no-explicit-any
	(c: Context): Promise<any>;
}

export interface routeFunc {
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
		const allRoutes = await findRoutesRecursive(routesDir, baseDir).catch(
			(err) => errorMsg(err),
		);

		const routeFunctions: routeFunc[] = [];
		for (const routeFile of allRoutes) {
			const route: routeFunc = await import(`./../${routeFile}`).catch(
				(err) => {
					console.error(
						'There was an error while processing the route import, please ensure the codebase is properly cloned.',
					);
					console.error(err);
					Deno.exit(-1);
				},
			);
			routeFunctions.push(route);
		}
		return routeFunctions;
	},
};
