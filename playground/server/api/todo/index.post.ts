import { z } from 'zod'

const todoRequestSchema = z.object({
  description: z.string().min(1, 'Description is required'),
})

export default defineEventHandler(async (event) => {
  const validated = await validatedInput(event, todoRequestSchema)

  // do something with the body
  const newTodo = {
    id: 1,
    description: validated.description,
  }

  // simulate a slow response to show the loading state o the front-end
  await sleep(1000)

  return newTodo
})

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
