import { expect } from "jsr:@std/expect"
const testingURL = new URL("http://localhost:8000")
Deno.test({
    name: "Register",
    async fn() {
        const res = await fetch(testingURL + "auth/register", {
            method: "POST",
            body: JSON.stringify({
                username: "bluefieldcreator",
                email: "blue@fields.com",
                password: "passWord123!$",
                passwordRepeat: "passWord123!$",
            }),
        })

        expect(res.status).toBe(200)
        expect(await res.json()).toEqual({
            status: 200,
            data: {
                message: "Register complete.",
            },
        })
    },
})

Deno.test({
    name: "Fail to Register",
    async fn() {
        const res = await fetch(testingURL + "auth/register", {
            method: "POST",
            body: JSON.stringify({
                username: "0",
                email: "0",
                password: "0",
                passwordRepeat: "0",
            }),
        })

        expect(res.status).toBe(200)
        expect(await res.json()).toEqual({
            status: 500,
            data: {
                message: "Failed to register",
            },
        })
    },
})
