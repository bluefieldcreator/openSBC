export async function findRoutesRecursive(dir: string, baseDir: string) {
	const routes: string[] = [];

	for await (const entry of Deno.readDir(dir)) {
		const fullPath = `${dir}/${entry.name}`;
		// Create relative path by removing the baseDir
		const relativePath = fullPath.substring(baseDir.length);

		if (entry.isFile && entry.name.endsWith('.ts')) {
			routes.push(relativePath);
		} else if (entry.isDirectory) {
			routes.push(...await findRoutesRecursive(fullPath, baseDir));
		}
	}

	return routes;
}
