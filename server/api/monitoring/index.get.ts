// @ts-expect-error missing import
// eslint-disable-next-line import/named
import { useNitroApp } from '#imports'

export default defineEventHandler(() => {
  const { db } = useNitroApp()

  return db.data.monitoring
})
