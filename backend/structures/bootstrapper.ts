import { Hono } from "hono"
import { init } from "./server.ts"

const app = new Hono()
init(app)
