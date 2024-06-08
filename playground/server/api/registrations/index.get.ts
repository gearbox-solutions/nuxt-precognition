import db from "~/database";

export default defineEventHandler(async (event) => {
  // get the list of registrations from the database
  const results = await db.query.registrations.findMany();

  return results;
});
