import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// Business Plan Table
export const businessPlan = sqliteTable('business_plan', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    version: text('version').notNull().default('1.0'),
    createdAt: text('created').default('CURRENT_TIMESTAMP'),  // ✅ Match SQLite
    updatedAt: text('updated').default('CURRENT_TIMESTAMP')   // ✅ Match SQLite
});

// Sections Table
export const sections = sqliteTable('sections', {
    id: text('id').primaryKey(),  // ✅ Match TEXT primary key type
    title: text('title').notNull(),
    order: integer('order').notNull(),
    businessPlanId: text('business_plan').notNull().references(() => businessPlan.id), // ✅ Match SQLite column name
    createdAt: text('created').default('CURRENT_TIMESTAMP'),
    updatedAt: text('updated').default('CURRENT_TIMESTAMP')
});

// Subsections Table
export const subsections = sqliteTable('subsections', {
	id: integer('id').primaryKey(),
	title: text('title'),  
	content: text('content').notNull(),
	order: integer('order').notNull(),
	sectionId: integer('section').notNull().references(() => sections.id),
	createdAt: text('created').default('CURRENT_TIMESTAMP'),
    updatedAt: text('updated').default('CURRENT_TIMESTAMP')
});

// Pros Table
export const pros = sqliteTable('pros', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	rank: integer('rank'),
	status: text('status'),
	joinDate: text('join_date').notNull().default("CURRENT_TIMESTAMP"),
	earnings: real('earnings').notNull()
});

// Sponsorships Table
export const sponsorships = sqliteTable('sponsorships', {
	id: integer('id').primaryKey(),
	amount: real('amount').notNull(),
	growth: real('growth_percentage'),
	date: text('date').notNull().default("CURRENT_TIMESTAMP")
});

// Ticket Sales Table
export const ticketSales = sqliteTable('ticket_sales', {
	id: integer('id').primaryKey(),
	quantity: integer('quantity').notNull(),
	revenue: real('revenue').notNull(),
	eventDate: text('event_date').notNull().default("CURRENT_TIMESTAMP"),
	growth: real('growth_percentage')
});

// Executive Staff Table
export const executiveStaff = sqliteTable('executive_staff', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	role: text('role').notNull(),
	avatarUrl: text('avatar_url'),
	contribution: real('contribution')
});
