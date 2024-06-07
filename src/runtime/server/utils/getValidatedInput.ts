import { type H3Event } from 'h3'
import type { ZodObject } from 'zod'
import { readValidatedBody, createError } from 'h3'

export default async function<T>(event: H3Event, validationSchema: ZodObject<unknown>) {
  const body = await readValidatedBody<T>(event, body => validationSchema.safeParse(body))
  if (!body.success) {
    // there was an error validating the body
    const fieldErrors = body.error.flatten().fieldErrors
    throwValidationError(fieldErrors)
  }

  return body.data
}

function throwValidationError(errors: Record<string, string>) {
  const error = createError(
    {
      statusCode: 422,
      message: 'Validation Error',
      data: { errors },
    },
  )
  throw error
}
