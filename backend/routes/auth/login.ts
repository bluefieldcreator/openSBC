import type { Context } from "hono"
import type { Ischema } from "../../utils/schema.ts"

export const schema: Ischema = {
	name: "Login",
	description: "Authenthicates a user into the service.",
	url: "/auth/login",
	method: "POST",
	middleware: [],
}

export async function run(c: Context) {
	return c.text("Hi")
}
