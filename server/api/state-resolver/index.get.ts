// @ts-expect-error missing import
// eslint-disable-next-line import/named
import { useNitroApp } from '#imports'

export default defineEventHandler(async () => {
  const { db } = useNitroApp()
  const monitoringList = db.data.monitoring

  const promiseList = []
  for (const monitoring of monitoringList) {
    promiseList.push($fetch(monitoring.url))
  }

  const states = await Promise.allSettled(promiseList)

  for (const [index, state] of states.entries()) {
    const monitoring = monitoringList[index]
    const databaseRow = db.data.monitoring.find(({ url }) => url === monitoring.url)

    databaseRow.status = state.status === 'fulfilled' ? 'OK' : 'ERROR'
  }

  await db.write()

  return {}
})
