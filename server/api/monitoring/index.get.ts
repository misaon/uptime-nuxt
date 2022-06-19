import db from '~/service/database'

export default defineEventHandler(async () => {
  const $database = await db()

  return $database.data.monitoring
})
