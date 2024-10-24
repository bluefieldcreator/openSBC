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
