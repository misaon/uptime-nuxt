import db from "~/service/database"

export default defineEventHandler(async () => {
    const $db = await db()

    return $db.data.monitoring
})
