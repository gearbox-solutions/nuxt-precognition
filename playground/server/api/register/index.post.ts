import { z } from "zod";

const registrationSchema = z.object({
  email: z.string().trim().email(),
  age: z.number().min(18, "You must be at least 18 years old"),
});

export default defineEventHandler(async (event) => {
  // validate the input
  // This will throw a validation error response if the input is invalid
  const validated = await getValidatedInput(event, registrationSchema);

  // do something with the body
  const newUser = {
    id: 1,
    email: validated.email,
  };

  // simulate a slow response to show the loading state o the front-end
  await sleep(1000);

  return newUser;
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
