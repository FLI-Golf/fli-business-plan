import { sqliteTable, text, integer, real, timestamp } from 'drizzle-orm/sqlite-core';

export const pros = sqliteTable('pros', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	rank: integer('rank'),
	status: text('status'),
	joinDate: timestamp('join_date').notNull(),
	earnings: real('earnings').notNull()
});

export const sponsorships = sqliteTable('sponsorships', {
	id: integer('id').primaryKey(),
	amount: real('amount').notNull(),
	growth: real('growth_percentage'),
	date: timestamp('date').notNull()
});

export const ticketSales = sqliteTable('ticket_sales', {
	id: integer('id').primaryKey(),
	quantity: integer('quantity').notNull(),
	revenue: real('revenue').notNull(),
	eventDate: timestamp('event_date').notNull(),
	growth: real('growth_percentage')
});

export const executiveStaff = sqliteTable('executive_staff', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	role: text('role').notNull(),
	avatarUrl: text('avatar_url'),
	contribution: real('contribution')
});