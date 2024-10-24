import { Hono } from "hono"
import { poweredBy } from "hono/powered-by"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { secureHeaders } from "hono/secure-headers"
import { cache } from "hono/cache"
import { errorMsg } from "../utils/error.ts"
import type { BlankEnv, BlankSchema } from "hono/types"
import "jsr:@std/dotenv/load"
import route from "./route.ts"

const isDebug = Deno.env.get("DEBUGGING") == "true" ? true : false

export async function init(app: Hono<BlankEnv, BlankSchema, "/">) {
	const routes = await route.load().catch((err) => errorMsg(err))

	/**
	 * Middleware
	 */
	app.use(logger())
	app.use(cors())
	app.use(poweredBy())
	app.use(secureHeaders())
	// Must use `wait: true` for the Deno runtime
	app.get(
		"*",
		cache({
			cacheName: "my-app",
			cacheControl: "max-age=3600",
			wait: true,
		}),
	)
	/**
	 * Route logging
	 */
	for (const registeredRoute of routes!) {
		if (isDebug) {
			/*console.log(
        `🧭 | ${registeredRoute.schema.method} | ${registeredRoute.schema.name} | ${registeredRoute.schema.description}`,
      )*/
			console.table(registeredRoute.schema)
		}
		// In case the route doesnt have any properties, we send it to fallback.
		if (!registeredRoute.schema.method || !registeredRoute.schema.url) {
			errorMsg(new Error("No route parameters detected"), "Lack of route parameters", 1)
		}

		app.on(
			registeredRoute.schema.method,
			registeredRoute.schema.url,
			async (context) => await registeredRoute.run(context).catch((err: Error) => errorMsg(err, `Error booting up run sequence for ${registeredRoute.schema.url}`, 0)),
		)
	}

	Deno.serve(app.fetch)
}
