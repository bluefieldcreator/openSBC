import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"
import type { registerSchema } from "../schemas/register.schema.ts"
import { jsonStatus } from "../utils/error.ts"
import type { Context } from "hono"
const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export class userService {
    c: Context
    constructor(c: Context) {
        this.c = c
    }
    async register(userData: registerSchema) {
        const { username, password, passwordRepeat, email } = userData
        // Validate username, pwd, etc...
        if (!username || !password) {
            return jsonStatus(this.c, 400, "You must fill all the form inputs.")
        }

        if (username.length < 3 || username.length > 25) {
            return jsonStatus(this.c, 400, "Your username must be between 3 to 25 Characters.")
        }

        if (!(emailRegex.test(email))) {
            return jsonStatus(this.c, 400, "Invalid E-Mail format.")
        }

        if (password != passwordRepeat) {
            return jsonStatus(this.c, 400, "Passwords dont match.")
        }

        const passwordHash = await bcrypt.hash(password)
        const emailHash = await bcrypt.hash(email)

        // DATABASE LOGIC HERE

        return true // user object in this case.
    }
}
