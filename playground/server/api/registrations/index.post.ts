import { z } from "zod";
import db from "~/database";
import registrations from "~/database/schema/registrations";
import { eq, sql } from "drizzle-orm";

const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .email()
    .refine((val) => checkIfEmailExists(val), "This email is already in use"),
  age: z.number().min(18, "You must be at least 18 years old"),
});

function checkIfEmailExists(email: string) {
  const result = db
    .select({ count: sql<number>`count(*)` })
    .from(registrations)
    .where(eq(registrations.email, email))
    .get();
  return result.count == 0;
}

export default defineEventHandler(async (event) => {
  // validate the input
  // This will throw a validation error response if the input is invalid
  const validated = await getValidatedInput(event, registrationSchema);

  // do something with the body
  const newRegistration = {
    name: validated.name,
    email: validated.email,
  };

  const creatredRegistration = db.insert(registrations).values(newRegistration).returning();

  // simulate a slow response to show the loading state o the front-end
  await sleep(1000);

  return creatredRegistration;
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
