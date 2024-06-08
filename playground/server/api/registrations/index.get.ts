import fakeDatabase from "~/server/utils/fakeDatabase";

export default defineEventHandler(async (event) => {
  // get the list of registrations from the database

  return fakeDatabase;
});
