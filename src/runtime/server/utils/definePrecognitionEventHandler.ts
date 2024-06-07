import { type EventHandler, type EventHandlerRequest, type H3Event, setResponseHeader } from 'h3'
import type { ZodSchema, ZodObject } from 'zod'
import { z } from 'zod'
import { defineEventHandler } from 'h3'
import getValidatedInput from './getValidatedInput'

const precognitionEventHandler = <T extends EventHandlerRequest, D> (
  zodObject: ZodObject,
  handler: EventHandler<T, D>,
): EventHandler<T, D> =>
    defineEventHandler<T>(async (event) => {
      // do something before the route handler
      console.log('starting precognition event handler')
      const headers = getHeaders(event)

      if (!headers.precognition) {
        // this is not a precognition event
        // return the regular response
        console.log('Regular event handler running')

        return handler(event)
      }

      const validateOnlyHeader = headers['precognition-validate-only']
      const fieldsToValidate = validateOnlyHeader
        ? validateOnlyHeader.split(',')
        : []

      // this is a precognition event
      console.log('Handling precognition event...')
      return await processPrecognitionRequest(event, zodObject, fieldsToValidate)
    })

async function processPrecognitionRequest(event: H3Event, zodSchema: ZodSchema, fieldsToValidate: string) {
  // get the field we want to validate from the precognition object

  // get the zod validation schema only for the fields we want to validate
  const zodSchemaToUse = fieldsToValidate.reduce((obj, field) => {
    obj[field] = zodSchema.shape[field]
    return obj
  }, {} as Record<string, ZodSchema>)

  // turn our individual schema into a zod object
  const schema = z.object (zodSchemaToUse)
  // validate just this one field
  try {
    await getValidatedInput(event, schema)
  }
  catch (error) {
    // only handle our expected errors
    if (!(error.statusCode === 422)) {
      throw error
    }

    setResponseHeader(event, 'precognition', true)
    throw error
  }
  return true
}

export default precognitionEventHandler
