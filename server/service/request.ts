import https from 'node:https'

export default function (host: string) {
  return new Promise((resolve) => {
    const options = {
      host,
      path: '',
      port: 443,
      method: 'GET',
      rejectUnauthorized: false
    }

    const timings = {
      startAt: process.hrtime(),
      dnsLookupAt: undefined,
      tcpConnectionAt: undefined,
      tlsHandshakeAt: undefined,
      firstByteAt: undefined,
      endAt: undefined
    }

    const request = https.request(options, (response) => {
      request.setTimeout(5 * 1000)

      response.once('readable', () => {
        timings.firstByteAt = process.hrtime()
      })
      response.on('data', () => {})
      response.on('end', () => {
        timings.endAt = process.hrtime()
        resolve({
          response,
          timings
        })
      })
    })

    request.on('socket', (socket) => {
      socket.on('lookup', () => {
        timings.dnsLookupAt = process.hrtime()
      })
      socket.on('connect', () => {
        timings.tcpConnectionAt = process.hrtime()
      })
      socket.on('secureConnect', () => {
        timings.tlsHandshakeAt = process.hrtime()
      })
    })

    request.on('error', error => resolve({
      error
    }))
    request.end()
  })
}
