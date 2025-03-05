import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import type { RequestHandler } from './$types';

const POCKETBASE_URL = 'https://few-likely.pockethost.io';

export const GET: RequestHandler = async () => {
    try {
        const pb = new PocketBase(POCKETBASE_URL);
        
        // Get all global records, sorted by order
        const globalRecords = await pb.collection('global').getFullList(500, {
            sort: 'order'
        });

        console.log("✅ DEBUG: Global Records Found:", globalRecords);

        if (!globalRecords.length) {
            console.log("❌ DEBUG: No global records found");
            return json({ error: 'No global records found' }, { status: 404 });
        }

        return json({
            globalRecords
        });

    } catch (error) {
        console.log("❌ DEBUG: API Error:", error);
        return json({ error: 'Failed to fetch global records' }, { status: 500 });
    }
};
