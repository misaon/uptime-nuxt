import {resolve, dirname} from 'node:path'
import { Low, JSONFile } from 'lowdb'

type Data = {
    monitoring: {url: string, status: string}[]
}

const createDatabase = async () => {
    const databaseFile = resolve(dirname(''), 'data/db.json')

    const adapter = new JSONFile<Data>(databaseFile)
    const db = new Low(adapter)

    await db.read()

    db.data ||= { monitoring: [] }

    return db
}

export default createDatabase
