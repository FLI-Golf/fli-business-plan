import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import type { RequestHandler } from './$types';

const pb = new PocketBase('https://few-likely.pockethost.io');

export const GET: RequestHandler = async () => {
    const records = await pb.collection('obstacles').getFullList({
        sort: 'created',
        expand: 'category'
    });
    return json(records);
}
