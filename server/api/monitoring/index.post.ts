import db from '~/service/database'

export default defineEventHandler(async (event) => {
  const { url } = await useBody(event)
  const $database = await db()

  $database.data.monitoring.push({
    url,
    status: 'PENDING'
  })

  await $database.write()

  return {
    status: 'ok'
  }
})
