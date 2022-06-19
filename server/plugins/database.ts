import { dirname, resolve } from 'node:path'
import { JSONFile, Low } from 'lowdb'

type Data = {
  monitoring: {url: string, status: string}[]
}

export default defineNitroPlugin(async (nitroApp) => {
  const databaseFile = resolve(dirname(''), 'server/data/db.json')

  const adapter = new JSONFile<Data>(databaseFile)
  const database = new Low(adapter)

  await database.read()

  database.data ||= { monitoring: [] }

  nitroApp.db = database
})
