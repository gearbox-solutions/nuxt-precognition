export default defineEventHandler(async (event) => {
  await sleep(1000)
  // throw createError({ statusCode: 422, statusMessage: 'Validation Error' })
})

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
