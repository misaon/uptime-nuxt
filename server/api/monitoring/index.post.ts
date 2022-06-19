// @ts-expect-error missing import
// eslint-disable-next-line import/named
import { useNitroApp } from '#imports'

export default defineEventHandler(async (event) => {
  const { db } = useNitroApp()
  const { host } = await useBody(event)

  db.data.monitoring.push({
    host,
    status: 'PENDING'
  })

  await db.write()

  return {
    status: 'OK'
  }
})
