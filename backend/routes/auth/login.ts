import type { Context } from 'hono';

export const options = {
	url: '/auth/login',
	method: 'GET',
	middleware: [],
};

export function run(c: Context) {
	return c.text('Hi');
}
