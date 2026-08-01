CREATE TABLE `leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`reference` text NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`phone` text NOT NULL,
	`material` text DEFAULT '' NOT NULL,
	`weight` text DEFAULT '' NOT NULL,
	`address` text DEFAULT '' NOT NULL,
	`comment` text DEFAULT '' NOT NULL,
	`source` text DEFAULT 'site' NOT NULL,
	`utm_source` text DEFAULT '' NOT NULL,
	`utm_medium` text DEFAULT '' NOT NULL,
	`utm_campaign` text DEFAULT '' NOT NULL,
	`utm_content` text DEFAULT '' NOT NULL,
	`utm_term` text DEFAULT '' NOT NULL,
	`photo_key` text,
	`photo_name` text,
	`photo_type` text,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `leads_reference_unique` ON `leads` (`reference`);--> statement-breakpoint
CREATE INDEX `leads_created_at_idx` ON `leads` (`created_at`);--> statement-breakpoint
CREATE INDEX `leads_status_idx` ON `leads` (`status`);--> statement-breakpoint
CREATE INDEX `leads_phone_idx` ON `leads` (`phone`);