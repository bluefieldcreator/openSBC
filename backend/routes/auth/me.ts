import type { Context } from "hono"
import type { Ischema } from "../../utils/schema.ts"

export const schema: Ischema = {
	name: "Me",
	description: "Authorizes the current user & fetches their data.",
	url: "/auth/me",
	method: "GET",
	middleware: [],
}

export async function run(c: Context) {
	return c.text("Alive")
}
