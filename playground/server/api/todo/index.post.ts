import { z } from 'zod'

const todoRequestSchema = z.object({
  description: z.string().min(1, 'Description is required'),
})

export default defineEventHandler(async (event) => {
  await sleep(1000)

  const body = await getValidatedBody(event, todoRequestSchema)

  // do something with the body
  const newTodo = {
    id: 1,
    description: body.description,
  }

  return newTodo
})

async function getValidatedBody(event, schema) {
  const body = await readValidatedBody(event, body => schema.safeParse(body))
  if (!body.success) {
    throwValidationError(body.error.flatten().fieldErrors)
  }

  return body.data
}

function throwValidationError(errors: Record<string, string>) {
  throw createError(
    {
      statusCode: 422,
      message: 'Validation Error',
      data: { errors },
    },
  )
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
