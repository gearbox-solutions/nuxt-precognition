export default async function (event, schema) {
  const body = await readValidatedBody(event, body => schema.safeParse(body))
  if (body.success) {
    return body.data
  }

  // there was an error validating the body
  throwValidationError(body.error.flatten().fieldErrors)
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
