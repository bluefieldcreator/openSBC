import { PrismaClient } from "../generated/client/deno/edge.ts"

export const db = new PrismaClient({
    datasources: {
        db: { url: "postgresql://postgres:postgres@localhost:5432/postgres?schema=public" }
    }
})
