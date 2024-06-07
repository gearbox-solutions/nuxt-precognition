import { z } from "zod";

const todoRequestSchema = z.object({
  description: z.string().trim().min(6, "Description not long enough").startsWith("todo:", 'Must start with "todo:"'),
  // .startsWith('todo:', 'Must start with "todo:"'),
});

export default defineEventHandler(async (event) => {
  const validated = await getValidatedInput(event, todoRequestSchema);

  // do something with the body
  const newTodo = {
    id: 1,
    description: validated.description,
  };

  // simulate a slow response to show the loading state o the front-end
  await sleep(1000);

  return newTodo;
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
