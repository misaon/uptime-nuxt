import { resolve, dirname } from 'node:path'
import { Low, JSONFile } from 'lowdb'

type Data = {
    monitoring: {url: string, status: string}[]
}

const createDatabase = async () => {
  const databaseFile = resolve(dirname(''), 'data/db.json')

  const adapter = new JSONFile<Data>(databaseFile)
  const database = new Low(adapter)

  await database.read()

  database.data ||= { monitoring: [] }

  return database
}

export default createDatabase
