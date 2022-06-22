// @ts-expect-error missing import
// eslint-disable-next-line import/named
import { useNitroApp } from '#imports'

export default defineEventHandler(() => {
  const { db } = useNitroApp()

  return db.monitoring.findMany({
    include: {
      requests: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 1000
      }
    }
  })
})
