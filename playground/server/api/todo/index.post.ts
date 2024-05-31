export default defineEventHandler(async (event) => {
  await sleep(1000)
})

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
