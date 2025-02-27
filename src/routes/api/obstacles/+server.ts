import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import type { RequestHandler } from './$types';

const pb = new PocketBase('https://few-likely.pockethost.io');

export const GET: RequestHandler = async () => {
    const records = await pb.collection('slides').getFullList({
        sort: '-created',
        expand: 'slide_ref'  // Updated to match your data structure
    });

    return json(records);
}
