import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";
import { logger } from "hono/logger";
import route from "./route.ts";


const app = new Hono();

const routes = await route.load();

app.use(poweredBy());
app.use(logger());

for (const registeredRoute of routes) {
  console.log(
    `🧭 | ${registeredRoute.options.method} | ${registeredRoute.options.url}`,
  );
  app.on(
    registeredRoute.options.method,
    registeredRoute.options.url,
    (context) => registeredRoute.run(context),
  );
}

Deno.serve(app.fetch);
