import { z } from 'zod'

const todoRequestSchema = z.object({
  description: z.string().trim().min(6, 'Description not long enough').startsWith('todo:', 'Must start with "todo:"'),
  age: z.number().min(18, 'Must be at least 18 years old'),
})

async function handler(event) {
  throw createError({
    statusCode: 500,
    statusMessage: 'I shouldn\'t run!',
  })
  const validated = await getValidatedInput(event, todoRequestSchema)

  // do something with the body
  const newTodo = {
    id: 1,
    description: validated.description,
  }

  // simulate a slow response to show the loading state o the front-end
  await sleep(1000)

  return newTodo
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default handlePrecognitionRequest(
  handler,
  todoRequestSchema,
)
