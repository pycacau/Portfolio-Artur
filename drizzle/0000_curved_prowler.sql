CREATE TABLE `review_rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`attempts` integer DEFAULT 0 NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`request_id` text NOT NULL,
	`name` text NOT NULL,
	`rating` integer NOT NULL,
	`comment` text NOT NULL,
	`project_name` text DEFAULT '' NOT NULL,
	`project_url` text DEFAULT '' NOT NULL,
	`photo_key` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `reviews_request_id_unique` ON `reviews` (`request_id`);--> statement-breakpoint
CREATE INDEX `reviews_created_at_index` ON `reviews` (`created_at`);