import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import type { RequestHandler } from './$types';

const POCKETBASE_URL = 'https://few-likely.pockethost.io';

export const GET: RequestHandler = async () => {
    try {
        const pb = new PocketBase(POCKETBASE_URL);
        
        // Get legal documents
        const legalDocs = await pb.collection('business_plan').getFullList(500, {
            filter: 'name = "Legal"',
            sort: 'created'
        });

        console.log("✅ DEBUG: Legal Documents Found:", legalDocs);

        if (!legalDocs.length) {
            console.log("❌ DEBUG: No legal documents found");
            return json({ error: 'No legal documents found' }, { status: 404 });
        }

        // Get sections for legal documents
        const sections = await pb.collection('sections').getFullList(500, {
            filter: `business_plan = "${legalDocs[0].id}"`,
            sort: 'order'
        });

        console.log("✅ DEBUG: Sections Found:", sections);

        // Get subsections
        const subsections = await pb.collection('subsections').getFullList(500, {
            sort: 'order'
        });

        console.log("✅ DEBUG: Subsections Found:", subsections);

        // Combine sections with their subsections
        const sectionsWithSubsections = sections.map(section => ({
            ...section,
            subsections: subsections.filter(sub => sub.section === section.id)
        }));

        return json({
            legalDocs: legalDocs[0],
            sections: sectionsWithSubsections
        });

    } catch (error) {
        console.log("❌ DEBUG: API Error:", error);
        return json({ error: 'Failed to fetch legal documents' }, { status: 500 });
    }
};
