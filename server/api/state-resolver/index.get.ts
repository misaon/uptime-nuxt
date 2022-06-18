import db from "~/service/database"

export default defineEventHandler(async () => {
    const $db = await db()
    const monitoringList = $db.data.monitoring

    const promiseList = []
    for (const monitoring of monitoringList) {
        promiseList.push($fetch(monitoring.url))
    }

    const states = await Promise.allSettled(promiseList)

    for (const [index, state] of states.entries()) {
        const monitoring = monitoringList[index]
        const dbRow = $db.data.monitoring.find(({url}) => url === monitoring.url)

        if (state.status === 'fulfilled') {
            dbRow.status = 'OK'
        } else {
            dbRow.status = 'ERROR'
        }
    }

    await $db.write()

    return {}
})
