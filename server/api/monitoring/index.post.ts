import db from "~/service/database"

export default defineEventHandler(async (event) => {
    const { url } = await useBody(event)
    const $db = await db()

    $db.data.monitoring.push({
        url,
        status: 'PENDING'
    })

    await $db.write()

    return {
        status: 'ok'
    }
})
