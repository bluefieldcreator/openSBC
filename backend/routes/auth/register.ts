import type { Context } from "hono"
import type { Ischema } from "../../utils/schema.ts"
import { errorMsg } from "./../../utils/error.ts"
import { userService } from "../../services/userService.ts"

export const schema: Ischema = {
	name: "Register",
	description: "Register's a new user to the service.",
	url: "/auth/register",
	method: "POST",
	middleware: [],
}

export async function run(c: Context) {
	const requestData = await c.req.json()

	const user = new userService(c)
	await user.register(requestData).catch((err) => errorMsg(err, "Error during register service processing", 1))

	return c.json({
		status: 200,
		data: {
			message: "Register complete.",
		},
	})
}
