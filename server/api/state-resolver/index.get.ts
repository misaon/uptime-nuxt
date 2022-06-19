import db from '~/service/database'

export default defineEventHandler(async () => {
  const $database = await db()
  const monitoringList = $database.data.monitoring

  const promiseList = []
  for (const monitoring of monitoringList) {
    promiseList.push($fetch(monitoring.url))
  }

  const states = await Promise.allSettled(promiseList)

  for (const [index, state] of states.entries()) {
    const monitoring = monitoringList[index]
    const databaseRow = $database.data.monitoring.find(({ url }) => url === monitoring.url)

    databaseRow.status = state.status === 'fulfilled' ? 'OK' : 'ERROR'
  }

  await $database.write()

  return {}
})
