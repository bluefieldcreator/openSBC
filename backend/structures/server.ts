import { Hono } from "hono"
import { poweredBy } from "hono/powered-by"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { secureHeaders } from "hono/secure-headers"
import { cache } from "hono/cache"
import { errorMsg } from "../utils/error.ts"

import "jsr:@std/dotenv/load"
import route from "./route.ts"

const isDebug = Deno.env.get("DEBUGGING") == "true" ? true : false

const app = new Hono()

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
for (const registeredRoute of routes) {
	if (isDebug) {
		console.log(
			`🧭 | ${registeredRoute.options.method} | ${registeredRoute.options.url}`,
		)
	}
	// In case the route doesnt have any properties, we send it to fallback.
	if (!registeredRoute.options.method || !registeredRoute.options.url) {
		registeredRoute.options = {
			method: "GET",
			url: "/fallback",
			middleware: [""],
		}
	}

	app.on(
		registeredRoute.options.method,
		registeredRoute.options.url,
		async (context) => await registeredRoute.run(context).catch((err) => errorMsg(err)),
	)
}

Deno.serve(app.fetch)
