import { db } from '$lib/server/db';
import { sections } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';

const runTest = async () => {
    console.log("✅ DEBUG: Connecting to SQLite Database");

    const sectionsList = await db
        .select()
        .from(sections)
        .where(eq(sections.businessPlanId, 'af1lsk4yh6mz8r1')) // Match Business Plan ID
        .orderBy(asc(sections.order));

    console.log("✅ TEST: Drizzle Found Sections:", sectionsList);
};

runTest().catch(console.error);
