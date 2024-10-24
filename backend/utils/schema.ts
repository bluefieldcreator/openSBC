export interface Ischema {
    name: string
    description: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    middleware: string[]
}