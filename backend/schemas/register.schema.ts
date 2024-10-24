import { z } from "zod"

const schema = z.object({
    username: z.string().describe("User's username"),
    email: z.string({})

})
export default {
	username: "string|min:3",
	email: "email",
	password: "string|numeric|min:8",
	passwordRepeat: "equal|field:password",
}


