import { sqliteTable, AnySQLiteColumn, integer, text, real, foreignKey } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const businessPlan = sqliteTable("business_plan", {
	id: integer().primaryKey().notNull(),
	name: text().notNull(),
	version: text().default("1.0"),
	createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
	updatedAt: text("updated_at").default("CURRENT_TIMESTAMP"),
});

export const executiveStaff = sqliteTable("executive_staff", {
	id: integer().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	role: text().notNull(),
	avatarUrl: text("avatar_url"),
	contribution: real(),
});

export const pros = sqliteTable("pros", {
	id: integer().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	rank: integer(),
	status: text(),
	joinDate: text("join_date").default("CURRENT_TIMESTAMP").notNull(),
	earnings: real().notNull(),
});

export const sections = sqliteTable("sections", {
	id: integer().primaryKey().notNull(),
	title: text().notNull(),
	order: integer().notNull(),
	businessPlan: integer("business_plan").notNull().references(() => businessPlan.id),
	createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
	updatedAt: text("updated_at").default("CURRENT_TIMESTAMP"),
});

export const sponsorships = sqliteTable("sponsorships", {
	id: integer().primaryKey().notNull(),
	amount: real().notNull(),
	growthPercentage: real("growth_percentage"),
	date: text().default("CURRENT_TIMESTAMP").notNull(),
});

export const subsections = sqliteTable("subsections", {
	id: integer().primaryKey().notNull(),
	title: text(),
	content: text().notNull(),
	order: integer().notNull(),
	section: integer().notNull().references(() => sections.id),
	createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
	updatedAt: text("updated_at").default("CURRENT_TIMESTAMP"),
});

export const ticketSales = sqliteTable("ticket_sales", {
	id: integer().primaryKey().notNull(),
	quantity: integer().notNull(),
	revenue: real().notNull(),
	eventDate: text("event_date").default("CURRENT_TIMESTAMP").notNull(),
	growthPercentage: real("growth_percentage"),
});

