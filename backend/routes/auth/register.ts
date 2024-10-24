import type { Context } from "hono"
import type { Ischema } from "../../utils/schema.ts"

export const schema: Ischema = {
	name: "Register",
	description: "Register's a new user to the service.",
	url: "/auth/register",
	method: "POST",
	middleware: [],
}

export function run(c: Context) {
	// Step 1 we analyze the data sent by the user.
	try {
		// validator.compile(registerSchema)(body)
		return c.json({
			status: 200,
			data: {
				message: "Register complete.",
			},
		})
	} catch {
		return c.json({
			status: 500,
			data: {
				message: "Failed to register",
			},
		})
	}
}
