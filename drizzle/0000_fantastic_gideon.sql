CREATE TABLE `business_plan` (
  `created` TEXT DEFAULT '' NOT NULL,
  `id` TEXT PRIMARY KEY DEFAULT ('r'||lower(hex(randomblob(7)))) NOT NULL,
  `name` TEXT DEFAULT '' NOT NULL,
  `updated` TEXT DEFAULT '' NOT NULL,
  `version` TEXT DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `executive_staff` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`role` text NOT NULL,
	`avatar_url` text,
	`contribution` real
);
--> statement-breakpoint
CREATE TABLE `pros` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`rank` integer,
	`status` text,
	`join_date` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`earnings` real NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sections` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`order` integer NOT NULL,
	`business_plan` integer NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`business_plan`) REFERENCES `business_plan`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sponsorships` (
	`id` integer PRIMARY KEY NOT NULL,
	`amount` real NOT NULL,
	`growth_percentage` real,
	`date` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `subsections` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`content` text NOT NULL,
	`order` integer NOT NULL,
	`section` integer NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`section`) REFERENCES `sections`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ticket_sales` (
	`id` integer PRIMARY KEY NOT NULL,
	`quantity` integer NOT NULL,
	`revenue` real NOT NULL,
	`event_date` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`growth_percentage` real
);
