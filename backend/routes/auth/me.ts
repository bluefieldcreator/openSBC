import type { Context } from 'hono';
import { db } from '../../structures/data.ts';

export const options = {
	url: '/auth/me',
	method: 'GET',
	middleware: [],
};

export function run(c: Context) {
}
