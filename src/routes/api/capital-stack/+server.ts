import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import type { RequestHandler } from './$types';

const POCKETBASE_URL = 'https://few-likely.pockethost.io';

export const GET: RequestHandler = async () => {
    try {
        const pb = new PocketBase(POCKETBASE_URL);

        const resultList = await pb.collection('capital_stack').getList(1, 50, {
            sort: 'order'
        });

        console.log('✅ DEBUG: Capital Stack Records Found:', resultList.items.length);

        return json({
            items: resultList.items,
            page: resultList.page,
            perPage: resultList.perPage,
            totalItems: resultList.totalItems,
            totalPages: resultList.totalPages
        });

    } catch (error: any) {
        console.error('❌ ERROR: Fetching capital stack data failed:', error.message);
        return json({ items: [], page: 1, perPage: 50, totalItems: 0, totalPages: 0 });
    }
};
