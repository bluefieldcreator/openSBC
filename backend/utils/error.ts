import type { Context } from "hono"
import type { StatusCode } from "hono/utils/http-status"

export function errorMsg(
	err: Error,
	msg: string = "There was an error in the codebase. OpenSBC will exit now.",
	severity: number = 0,
): void | never {
	console.error(msg)
	console.error(err)

	switch (severity) {
		case 0:
			console.log(`SEVERITY 0 ERROR DETECTED | APP WILL CONTINUE TO RUN.`)
			break
		case 1:
			console.log(`SEVERITY 0 ERROR DETECTED | APP WILL SHUT DOWN.`)
			Deno.exit(0)
	}
}

export function jsonStatus(c: Context, status: StatusCode, msg: string) {
	c.status(status)
	return c.json({
		status: status,
		data: {
			message: msg,
		},
	})
}
