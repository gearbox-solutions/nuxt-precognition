import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./playground/database/schema/",
  out: "./playground/database/migrations/",
  dialect: "sqlite",
  verbose: true,
  dbCredentials: {
    url: "./playground/database/sqlite.db",
  },
} satisfies Config;
