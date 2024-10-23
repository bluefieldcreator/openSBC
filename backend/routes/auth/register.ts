import type { Context } from "hono";

export const options = {
  url: "/auth/register",
  method: "GET",
  middleware: [],
};

export function run(c: Context) {
  return c.text("register.ts");
}
