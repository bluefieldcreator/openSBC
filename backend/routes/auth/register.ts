import type { Context } from "hono"
import type { Ischema } from "../../utils/schema.ts"
import type { registerSchema } from "../../schemas/register.schema.ts"
import { jsonStatus } from "./../../utils/error.ts"
import { db } from "./../../structures/data.ts"
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts"
// Considering to lazy load this...
const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const schema: Ischema = {
	name: "Register",
	description: "Register's a new user to the service.",
	url: "/auth/register",
	method: "POST",
	middleware: [],
}

export async function run(c: Context) {
	// Step 1 we analyze the data sent by the user.

	const { username, password, passwordRepeat, email }: registerSchema = await c.req.json()

	// Validate username, pwd, etc...
	if (!username || !password) {
		return jsonStatus(c, 400, "You must fill all the form inputs.")
	}

	if (username.length < 3 || username.length > 25) {
		return jsonStatus(c, 400, "Your username must be between 3 to 25 Characters.")
	}

	if (!(emailRegex.test(email))) {
		return jsonStatus(c, 400, "Invalid E-Mail format.")
	}

	if (password != passwordRepeat) {
		return jsonStatus(c, 400, "Passwords dont match.")
	}

	// Hash E-Mail & Password
	const passwordHash = await bcrypt.hash(password)
	const emailHash = await bcrypt.hash(email)

	// Here we would send the verification E-Mail, TBD
	/**
	 * Connect to E-mail provider.
	 */

	return c.json({
		status: 200,
		data: {
			message: "Register complete.",
		},
	})
}
