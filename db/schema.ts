import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  reference: text("reference").notNull().unique(),
  name: text("name").notNull().default(""),
  phone: text("phone").notNull(),
  material: text("material").notNull().default(""),
  weight: text("weight").notNull().default(""),
  address: text("address").notNull().default(""),
  comment: text("comment").notNull().default(""),
  source: text("source").notNull().default("site"),
  utmSource: text("utm_source").notNull().default(""),
  utmMedium: text("utm_medium").notNull().default(""),
  utmCampaign: text("utm_campaign").notNull().default(""),
  utmContent: text("utm_content").notNull().default(""),
  utmTerm: text("utm_term").notNull().default(""),
  photoKey: text("photo_key"),
  photoName: text("photo_name"),
  photoType: text("photo_type"),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("leads_created_at_idx").on(table.createdAt),
  index("leads_status_idx").on(table.status),
  index("leads_phone_idx").on(table.phone),
]);
