import { sql } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export default sqliteTable("registrations", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 255 }),
  email: text("email", { length: 255 }).unique(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});
