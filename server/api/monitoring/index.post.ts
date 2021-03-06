// @ts-expect-error missing import
// eslint-disable-next-line import/named
import { useNitroApp } from '#imports'

export default defineEventHandler(async (event) => {
  const { db } = useNitroApp()
  const { host } = await useBody(event)

  await db.monitoring.create({
    data: {
      host
    }
  })

  return {
    status: 'OK'
  }
})
