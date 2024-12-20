import { fromFileUrl } from "https://deno.land/std@0.224.0/path/from_file_url.ts"
import { findRoutesRecursive } from "../utils/files.ts"
import type { Context } from "hono"
import { errorMsg } from "../utils/error.ts"

interface Irun {
	// deno-lint-ignore no-explicit-any
	(c: Context): Promise<any>
}

export interface routeFunc {
	schema: {
		name: string
		description: string
		url: string
		method: string
		middleware: string[]
	}
	run: Irun
}

export default {
	load: async () => {
		const routesDir = fromFileUrl(new URL("../routes", import.meta.url))

		const baseDir = routesDir.substring(
			0,
			routesDir.lastIndexOf("/routes"),
		)
		const allRoutes = await findRoutesRecursive(routesDir, baseDir).catch(
			(err) => errorMsg(err, "Error logging routes to server", 1),
		)

		const routeFunctions: routeFunc[] = []
		for (const routeFile of allRoutes!) {
			const route: routeFunc = await import(`./../${routeFile}`).catch(
				(err) => errorMsg(err),
			)
			routeFunctions.push(route)
		}
		return routeFunctions
	},
}
