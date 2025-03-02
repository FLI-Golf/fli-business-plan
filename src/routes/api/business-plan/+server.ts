import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import type { RequestHandler } from './$types';
import type { BusinessPlan, Section, Subsection } from '$lib/types';

const POCKETBASE_URL = 'https://few-likely.pockethost.io';

export const GET: RequestHandler = async ({ request, url }) => {
    try {
        const pb = new PocketBase(POCKETBASE_URL);
        
        // Get the auth token and load it into PocketBase
        const authHeader = request.headers.get('Authorization');
        if (authHeader) {
            const token = authHeader.replace('Bearer ', '');
            pb.authStore.save(token);
        }

        console.log("✅ DEBUG: API Auth Status:", pb.authStore.isValid);
        console.log("✅ DEBUG: API Current User:", pb.authStore.model);

        // Get all plans
        const plans = await pb.collection('business_plan').getFullList<BusinessPlan>(500, {
            sort: '-created'
        });

        console.log("✅ DEBUG: Business Plans Found:", plans);

        if (!plans.length) {
            console.error("❌ ERROR: No plans found.");
            return json({ error: 'No plans found' }, { status: 404 });
        }

        // Select the appropriate plan based on the type parameter
        const type = url.searchParams.get('type');
        const plan = type === 'Legal' ? plans[0] : plans[1];
        
        console.log(`✅ DEBUG: Selected ${type} Plan:`, plan);

        // Fetch Sections linked to this Plan
        const sectionsList = await pb.collection('sections').getFullList<Section>(500, {
            filter: `business_plan = "${plan.id}"`,
            sort: 'order'
        });

        console.log("✅ DEBUG: Sections Found:", sectionsList);

        // Fetch Subsections
        const subsectionsList = await pb.collection('subsections').getFullList<Subsection>(500, {
            sort: 'order'
        });

        console.log("✅ DEBUG: Subsections Found:", subsectionsList);

        // Group Subsections Under Their Respective Sections
        const sectionsWithSubsections = sectionsList.map((section) => ({
            ...section,
            subsections: subsectionsList.filter(sub => sub.section === section.id)
        }));

        console.log("✅ DEBUG: Final Sections with Subsections:", sectionsWithSubsections);

        return json({
            businessPlan: plan,
            sections: sectionsWithSubsections
        });

    } catch (error: unknown) {
        console.error("❌ ERROR: Fetching data failed:", error instanceof Error ? error.message : String(error));
        return json({ error: 'Failed to fetch data' }, { status: 500 });
    }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchBusinessPlanDocs = async (pb: any) => {
    try {
      // First verify we have a valid auth token
      if (!pb.authStore.isValid) {
        throw new Error('Not authenticated');
      }

      const response = await fetch('/api/business-plan', {
        headers: {
          'Authorization': pb.authStore.token
        }
      });

      console.log("✅ DEBUG: Auth Token:", pb.authStore.token);
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("✅ DEBUG: Auth Status:", pb.authStore.isValid);
      console.log("✅ DEBUG: Current User:", pb.authStore.model);
      throw error;
    }
  };
  