import type { H3Event } from 'h3'
import type { ZodObject } from 'zod'

export default async function (event: H3Event, validationSchema: ZodObject<never>) {
  const body = await readValidatedBody(event, body => validationSchema.safeParse(body))
  if (!body.success) {
    throwValidationError(body.error.flatten().fieldErrors)
  }

  return body.data
  // there was an error validating the body
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
