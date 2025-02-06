import { relations } from "drizzle-orm/relations";
import { businessPlan, sections, subsections } from "./schema";

export const sectionsRelations = relations(sections, ({one, many}) => ({
	businessPlan: one(businessPlan, {
		fields: [sections.businessPlan],
		references: [businessPlan.id]
	}),
	subsections: many(subsections),
}));

export const businessPlanRelations = relations(businessPlan, ({many}) => ({
	sections: many(sections),
}));

export const subsectionsRelations = relations(subsections, ({one}) => ({
	section: one(sections, {
		fields: [subsections.section],
		references: [sections.id]
	}),
}));