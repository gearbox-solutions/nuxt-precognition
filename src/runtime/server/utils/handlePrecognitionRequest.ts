import type { EventHandler, EventHandlerRequest, H3Event } from 'h3'
import type { ZodSchema, type ZodObject } from 'zod'
import { z } from 'zod'

const defineWrappedResponseHandler = <T extends EventHandlerRequest, D> (
  handler: EventHandler<T, D>,
  zodObject: ZodObject<never>,
): EventHandler<T, D> =>
    defineEventHandler<T>(async (event) => {
      // do something before the route handler
      console.log('starting precognition event handler')
      const body = await readBody(event)
      if (!body.precognition) {
        // this is not a precognition event
        // return the regular response
        console.log('Regular event handler running')

        return handler(event)
      }

      // this is a precognition event
      console.log('Handling precognition event...')
      return await processPrecognitionRequest(event, zodObject, body.precognition.field)
    })

async function processPrecognitionRequest(event: H3Event, zodSchema: ZodSchema, field: string) {
  // get the field we want to validate from the precognition object

  // get the zod validation schema for the field
  const zodSchemaForField = zodSchema.shape[field]
  const schema = z.object ({ [field]: zodSchemaForField })
  // validate just this one field
  await getValidatedInput(event, schema)
  return true
}

export default defineWrappedResponseHandler
