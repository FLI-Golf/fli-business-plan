import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import type { RequestHandler } from './$types';

const POCKETBASE_URL = 'https://few-likely.pockethost.io';

export const GET: RequestHandler = async () => {
    try {
        const pb = new PocketBase(POCKETBASE_URL);
       
        const resultList = await pb.collection('partners').getList(1, 50, {
            sort: '-created',
            expand: 'avatar'
        });

        console.log("✅ DEBUG: Partners Found:", resultList.items);

        return json({
            partners: resultList.items,
            total: resultList.totalItems
        });

    } catch (error: any) {
        console.error("❌ ERROR: Fetching partners data failed:", error.message);
        return json({ partners: [], total: 0 });
    }
};

export const POST: RequestHandler = async ({ request, locals }) => {
    const data = await request.json();
   
    const record = await locals.pb.collection('partners').create(data);
   
    return json(record);
};