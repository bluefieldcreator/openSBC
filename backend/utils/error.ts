export function errorMsg(
	err: Error,
	msg: string = 'There was an error in the codebase. OpenSBC will exit now.',
): never {
	console.error(msg);
	console.error(err);
	Deno.exit(-1);
}
