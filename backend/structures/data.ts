import knex from "knex"
import "jsr:@std/dotenv/load"

export const db = knex({
	client: "mysql",
	connection: {
		host: Deno.env.get("DB_HOST"),
		port: Number(Deno.env.get("DB_PORT")),
		user: Deno.env.get("DB_USER"),
		password: Deno.env.get("DB_PASSWORD"),
		database: Deno.env.get("DB_NAME"),
	},
})
