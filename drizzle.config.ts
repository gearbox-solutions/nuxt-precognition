import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./playground/database/schema/",
  out: "./playground/database/migrations/",
  dialect: "sqlite",
  verbose: true,
  dbCredentials: {
    url: "./playground/.data/sqlite.db",
  },
} satisfies Config;
