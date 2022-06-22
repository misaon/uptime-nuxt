import { PrismaClient } from '@prisma/client'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.db = new PrismaClient()
})
