import type { Context } from "hono"
import type { Ischema } from "../../utils/schema.ts"

export const schema: Ischema = {
	name: "Get user by ID",
	description: "Fetches a user id.",
	url: "/users/:id",
	method: "GET",
	middleware: [],
}

export function run(c: Context) {
	const { id } = c.req.param()
	return c.text(id)
}
