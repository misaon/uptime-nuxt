import request from './request'

function getDuration (startTime, endTime) {
  const secondDiff = endTime[0] - startTime[0]
  const nanoSecondDiff = endTime[1] - startTime[1]
  const diffInNanoSecond = secondDiff * 1e9 + nanoSecondDiff

  return Math.round((diffInNanoSecond / 1e6) * 100) / 100
}

export default async function (database: any) {
  const monitoringList = await database.monitoring.findMany()
  const responses = await Promise.all(monitoringList.map(monitoring => request(monitoring.host)))

  for (const [index, { response, timings, error }] of responses.entries()) {
    const monitoring = monitoringList.find(({ host }) => host === monitoringList[index].host)

    if (error) {
      await database.request.create({
        data: {
          statusCode: 0,
          monitoring: { connect: { id: monitoring.id } }
        }
      })

      continue
    }

    await database.request.create({
      data: {
        statusCode: response.statusCode,
        dnsLookup: timings.dnsLookupAt !== undefined ? getDuration(timings.startAt, timings.dnsLookupAt) : undefined,
        tcpConnection: getDuration((timings.dnsLookupAt || timings.startAt), timings.tcpConnectionAt),
        tlsHandshake: timings.tlsHandshakeAt !== undefined ? getDuration(timings.tcpConnectionAt, timings.tlsHandshakeAt) : undefined,
        firstByte: getDuration((timings.tlsHandshakeAt || timings.tcpConnectionAt), timings.firstByteAt),
        contentTransfer: getDuration(timings.firstByteAt, timings.endAt),
        totalDuration: getDuration(timings.startAt, timings.endAt),
        monitoring: { connect: { id: monitoring.id } }
      }
    })
  }
}
