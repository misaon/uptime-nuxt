// @ts-expect-error missing import
// eslint-disable-next-line import/named
import { useNitroApp } from '#imports'

export default defineEventHandler(({ context }) => {
  const { db } = useNitroApp()
  const { id } = context.params

  return db.monitoring.delete({
    where: { id: Number(id) }
  })
})
