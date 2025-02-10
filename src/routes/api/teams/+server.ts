import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import type { RequestHandler } from './$types';

const POCKETBASE_URL = 'https://few-likely.pockethost.io';

export const GET: RequestHandler = async () => {
    try {
        const pb = new PocketBase(POCKETBASE_URL);
        
        const resultList = await pb.collection('teams').getList(1, 50, {
            sort: '-created',
            expand: 'avatar'
        });

        console.log("✅ DEBUG: Teams Found:", resultList.items);

        return json({
            teams: resultList.items,
            total: resultList.totalItems
        });

    } catch (error: any) {
        console.error("❌ ERROR: Fetching teams data failed:", error.message);
        return json({ teams: [], total: 0 });
    }
};
