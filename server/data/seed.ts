/* eslint-disable unicorn/prefer-module */
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const monitoringList = [
  {
    name: 'Google',
    host: 'www.google.com'
  },
  {
    name: 'Wikipedia',
    host: 'www.wikipedia.org'
  },
  {
    name: 'Nuxt 3',
    host: 'v3.nuxtjs.org'
  },
  {
    name: 'Vue 3',
    host: 'vuejs.org'
  },
  {
    name: 'Github',
    host: 'github.com'
  }
]

async function main () {
  for (const monitoring of monitoringList) {
    await prisma.monitoring.create({
      data: monitoring
    })
  }
}

main()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error)
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  })
// eslint-disable-next-line unicorn/prefer-top-level-await
  .finally(async () => {
    await prisma.$disconnect()
  })
