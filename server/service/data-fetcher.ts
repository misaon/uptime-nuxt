import https from 'node:https'

function makeRequest (host: string) {
  return new Promise((resolve) => {
    const options = {
      host,
      path: '',
      port: 443,
      method: 'GET',
      rejectUnauthorized: false
    }

    const request = https.request(options, (response) => {
      response.on('data', () => {})
      response.on('end', () => {
        resolve(response)
      })
    })

    request.on('error', error => resolve(error))
    request.end()
  })
}

export default async function (database: any) {
  const { monitoring: monitoringList } = database.data
  const promiseList = []

  for (const monitoring of monitoringList) {
    promiseList.push(makeRequest(monitoring.host))
  }

  const responses = await Promise.all(promiseList)

  for (const [index, response] of responses.entries()) {
    const monitoring = monitoringList[index]
    const databaseRow = monitoringList.find(({ host }) => host === monitoring.host)

    databaseRow.status = response.statusCode >= 200 && response.statusCode < 300 ? 'OK' : 'ERROR'
  }

  await database.write()
}
