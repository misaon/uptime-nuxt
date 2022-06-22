// @ts-expect-error missing import
// eslint-disable-next-line import/named
import { useNitroApp } from '#imports'
import dataFetcher from '~/server/service/data-fetcher'

export default defineNitroPlugin(async () => {
  const waitForDatabase = () => new Promise((resolve) => {
    const checker = setInterval(() => {
      try {
        const { db } = useNitroApp()
        clearInterval(checker)
        resolve(db)
      } catch {}
    }, 100)
  })

  const database: any = await waitForDatabase()

  setInterval(async () => {
    await dataFetcher(database)
  }, 15_000)
})
