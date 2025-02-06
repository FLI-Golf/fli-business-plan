import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import type { RequestHandler } from './$types';
import type { BusinessPlan, Section, Subsection } from '$lib/types';

const POCKETBASE_URL = 'https://8090-fligolf-flibusinessplan-3t70ta2c7qs.ws-us117.gitpod.io';

export const GET: RequestHandler = async () => {
    try {
        const pb = new PocketBase(POCKETBASE_URL);

        // ✅ Fetch Business Plans
        const plans = await pb.collection('business_plan').getFullList<BusinessPlan>(500, {
            sort: '-created'
        });

        console.log("✅ DEBUG: Business Plans Found:", plans);

        if (!plans.length) {
            console.error("❌ ERROR: No business plans found.");
            return json({ error: 'No business plans found' }, { status: 404 });
        }

        // ✅ Select the first business plan
        const plan = plans[0];
        console.log("✅ DEBUG: Selected Business Plan:", plan);

        // ✅ Fetch Sections linked to this Business Plan
        const sectionsList = await pb.collection('sections').getFullList<Section>(500, {
            filter: `business_plan = "${plan.id}"`,
            sort: 'order'
        });

        console.log("✅ DEBUG: Sections Found:", sectionsList);

        // ✅ Fetch Subsections Separately
        const subsectionsList = await pb.collection('subsections').getFullList<Subsection>(500, {
            sort: 'order'
        });

        console.log("✅ DEBUG: Subsections Found:", subsectionsList);

        // ✅ Group Subsections Under Their Respective Sections
        const sectionsWithSubsections = sectionsList.map((section) => ({
            ...section,
            subsections: subsectionsList.filter(sub => sub.section === section.id) // ✅ Filter subsections by `section` field
        }));

        console.log("✅ DEBUG: Final Sections with Subsections:", sectionsWithSubsections);

        return json({
            businessPlan: plan,
            sections: sectionsWithSubsections
        });

    } catch (error: any) {
        console.error("❌ ERROR: Fetching data failed:", error.message);
        return json({ error: 'Failed to fetch business plan data' }, { status: 500 });
    }
};
