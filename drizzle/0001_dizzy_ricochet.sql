ALTER TABLE `reviews` ADD `name_key` text;--> statement-breakpoint
CREATE UNIQUE INDEX `reviews_name_key_unique` ON `reviews` (`name_key`);