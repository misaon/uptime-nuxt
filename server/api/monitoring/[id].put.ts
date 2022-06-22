// @ts-expect-error missing import
// eslint-disable-next-line import/named
import { useNitroApp } from '#imports'

export default defineEventHandler(async (event) => {
  const { db } = useNitroApp()
  const { id } = event.context.params
  const { host } = await useBody(event)

  await db.monitoring.update({
    where: {
      id: Number(id)
    },
    data: {
      host
    }
  })

  return {
    status: 'OK'
  }
})
