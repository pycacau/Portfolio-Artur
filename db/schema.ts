import { sqliteTable, text, integer, index, uniqueIndex } from 'drizzle-orm/sqlite-core';
export const reviews = sqliteTable('reviews', {
  id: text('id').primaryKey(),
  requestId: text('request_id').notNull(),
  name: text('name').notNull(),
  nameKey: text('name_key'),
  rating: integer('rating').notNull(),
  comment: text('comment').notNull(),
  projectName: text('project_name').notNull().default(''),
  projectUrl: text('project_url').notNull().default(''),
  photoKey: text('photo_key'),
  createdAt: integer('created_at').notNull(),
}, table => [uniqueIndex('reviews_request_id_unique').on(table.requestId), uniqueIndex('reviews_name_key_unique').on(table.nameKey), index('reviews_created_at_index').on(table.createdAt)]);
export const reviewRateLimits = sqliteTable('review_rate_limits', {
  key: text('key').primaryKey(),
  attempts: integer('attempts').notNull().default(0),
  expiresAt: integer('expires_at').notNull(),
});
