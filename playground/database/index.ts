import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import registrations from "./schema/registrations";

const sqlite = new Database("./playground/.data/sqlite.db");

const config = {
  schema: { registrations },
  fileMustExist: true,
};
const db: BetterSQLite3Database = drizzle(sqlite, config);

export default db;
