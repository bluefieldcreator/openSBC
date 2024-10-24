import type { Context } from "hono";

export const options = {
  url: "/users/:id",
  method: "GET",
  middleware: [],
};

export function run(c: Context) {
  const { id } = c.req.param();
  return c.text(id);
}
