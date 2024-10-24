import { Hono } from 'hono';
import { poweredBy } from 'hono/powered-by';
import { logger } from 'hono/logger';
import "jsr:@std/dotenv/load";
import route from './route.ts';

const isDebug = Deno.env.get("DEBUGGING") == "true" ? true : false

const app = new Hono();

const routes = await route.load();

app.use(poweredBy());
app.use(logger());

/**
 * Route logging
 */
for (const registeredRoute of routes) {
  if(isDebug)
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
