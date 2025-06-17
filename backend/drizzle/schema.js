import { pgTable, varchar, serial } from "drizzle-orm/pg-core";

export const link = pgTable("link_view", {
  id: serial().primaryKey(),
  url: varchar({ length: 500 }).notNull().unique(),
  title: varchar({length: 500}).notNull(),
  favicon_url: varchar({ length: 255 }).notNull(),
  fetched_at: varchar({length: 255}).notNull()
});
