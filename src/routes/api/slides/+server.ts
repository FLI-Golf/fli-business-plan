import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import type { RequestHandler } from './$types';

const POCKETBASE_URL = 'https://few-likely.pockethost.io';

export const GET: RequestHandler = async ({ request }) => {
    try {
        const pb = new PocketBase(POCKETBASE_URL);
        
        const authHeader = request.headers.get('Authorization');
        if (authHeader) {
            const token = authHeader.replace('Bearer ', '');
            pb.authStore.save(token);
            console.log("✅ DEBUG: Token received and saved");
        }

        console.log("✅ DEBUG: Making authenticated request with token:", pb.authStore.token);
        console.log("✅ DEBUG: Auth valid:", pb.authStore.isValid);

        // First verify we have authentication
        if (!pb.authStore.isValid) {
            console.log("❌ DEBUG: Authentication invalid");
            throw new Error('Not authenticated');
        }

        const slidesList = await pb.collection('slides').getFullList(500, {
            sort: '-created',
            expand: 'slide_ref'
        });

        console.log("✅ DEBUG: Raw response:", slidesList);

        return json({
            slides: slidesList,
            total: slidesList.length
        });

    } catch (error: unknown) {
        console.log("❌ DEBUG: Full error:", error);
        return json({ slides: [], total: 0 }, { status: 401 });
    }
};
