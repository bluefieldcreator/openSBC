import type { Context } from "hono";

export const options = {
  url: "/auth/me",
  method: "GET",
  middleware: [],
};

export function run(c: Context) {
  return c.text("me.ts");
}
